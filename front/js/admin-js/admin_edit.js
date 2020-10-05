var urlParams;
var editor;
var message;
var selectedImageUrl;
var selectedImage;
var storedImageUrl;

editor = CKEDITOR.replace( 'message' );

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
       
      urlParams = new URLSearchParams(window.location.search);
      selectElement();
      document.getElementById("blog_image").onchange = function() {uploadImage()};
      
    });

    function selectElement(){
        var id= urlParams.get('edit');
        firebase.database().ref('blogs/'+id).on('value', function(snapshot){
                document.getElementById("blog-title").value= snapshot.val().title;
                 editor.setData(snapshot.val().body);
                 storedImageUrl=snapshot.val().image;
                document.getElementById('uploadImage').setAttribute('src',snapshot.val().image);
    });
}
editor.on( 'change', function( evt ) {
    // getData() returns CKEditor's HTML content.
    message= evt.editor.getData();
});


$('#blog_image').on('change',function (event){
    selectedImage=event.target.files[0];
    console.log(selectedImage);
});

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

    }); 
  });
}


function updateElement(e){
    e.preventDefault();

    var error_message = document.getElementById("error_message");
    var id= urlParams.get('edit');
    var title=$('#blog-title').val();

    if(validate(title,message,error_message)){

        firebase.database().ref('blogs/'+id).update({
            title:title,
            image:selectedImageUrl,
            body: message,
    })
       
        console.log("Saved in database sucessfylly");
        error_message.style.background="rgb(50,205,50)";
        error_message.style.padding = "10px";
        error_message.innerHTML = "Form Submitted and data updated Successfully!";
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
