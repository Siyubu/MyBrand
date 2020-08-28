var selectedImageUrl;
var selectedImage;

document.addEventListener("DOMContentLoaded",event=>{

var firebaseConfig = {
    apiKey: "AIzaSyClhpeLUDXcbzlojo163cR7OTNAFYTs8cg",
    authDomain: "iyubu-brand.firebaseapp.com",
    databaseURL: "https://iyubu-brand.firebaseio.com",
    projectId: "iyubu-brand",
    storageBucket: "iyubu-brand.appspot.com",
    messagingSenderId: "584752376351",
    appId: "1:584752376351:web:798876a05780cd1f9d032a",
    measurementId: "G-M66MWXPZMR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  document.getElementById("blog_image").onchange = function() {uploadImage()};

});
var message;


    /*-------- Function for input validation----------- */
    var editor = CKEDITOR.replace( 'message' );
    editor.on( 'change', function( evt ) {
        // getData() returns CKEditor's HTML content.
        console.log( '+++++++++++++++++Total bytes: ' + evt.editor.getData().length );
        message= evt.editor.getData();
    });

    $('#blog_image').on('change',function (event){
        selectedImage=event.target.files[0];
        console.log(selectedImage);
    })

function uploadImage(){
    //get names of files
    const imagename= selectedImage.name;
    //storage reference for each file

   const storageRef = firebase.storage().ref("/images/"+ imagename);

   // save files into our references
   const task = storageRef.put(selectedImage)

   task.on('state_changed', function(snapshot){ 
    var progress =  
     (snapshot.bytesTransferred / snapshot.totalBytes) * 100; 
      var uploader = document.getElementById('uploader-image'); 
      uploader.value=progress; 
      switch (snapshot.state) { 
        case firebase.storage.TaskState.PAUSED: 
          console.log('Upload is paused'); 
          break; 
        case firebase.storage.TaskState.RUNNING: 
          console.log('Upload is running'); 
          break; 
      } 
  }, function(error) {console.log(error); 
  }, function() { 

       // get the uploaded image url back 
       task.snapshot.ref.getDownloadURL().then( 
        function(downloadURL) { 

       // You get your url from here 
        console.log('File available at', downloadURL); 

      // print the image url  
       console.log(downloadURL); 
       selectedImageUrl=downloadURL;
     // document.getElementById('submit_image').removeAttribute('disabled'); 
      //document.querySelector('#imgUpload').setAttribute('src',selectedImageUrl)
    }); 
  });
}

function storeIntoDatabase(e){
    e.preventDefault();
    var error_message = document.getElementById("error_message");
    var title=$('#blog-title').val();
    var db=firebase.database();
    var postkey=db.ref('blogs/').push().key;
  
    var postData={
        title:title,
        image:selectedImageUrl,
        body: message,
    }

    var updates={};

   if(validate(title,message,error_message)){
    updates['/blogs/'+ postkey]=postData;
    console.log("Saved in database sucessfylly");
    error_message.style.background="blue";
    error_message.style.padding = "10px";
    error_message.innerHTML = "Form Submitted and data saved in database Successfully!";
    document.getElementById("blog-form").reset();
    return firebase.database().ref().update(updates);
}
}


function validate(title,message,error_message){
    
    var text;
    if(title.length < 5){
     error_message.style.padding = "10px";   
      text = "Title should be more than 5 characters";
      error_message.innerHTML = text;
      return false;
    }
    if(message.length <= 100 ||message==""){
        error_message.style.padding = "10px"; 
      text = "Please Enter More Than 100 Characters";
      error_message.innerHTML = text;
      return false;
    }
    return true;
  }
