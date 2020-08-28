var selectedImage;

document.addEventListener("DOMContentLoaded",event=>{
    var firebaseConfig = {
        apiKey: "AIzaSyDpSm-hBF6Ec5sb9kn6NLM3PKRxYxlpDPg",
        authDomain: "local-allocation.firebaseapp.com",
        databaseURL: "https://local-allocation.firebaseio.com",
        projectId: "local-allocation",
        storageBucket: "local-allocation.appspot.com",
        messagingSenderId: "659131770353",
        appId: "1:659131770353:web:b82c4d2acd1eb8d1011050",
        measurementId: "G-1RGPFT9QBH"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
     
     // const firebaseStorage= firebase.storage().ref("/images");
    document.getElementById('submit_created_blog').addEventListener('submit',submitForm);

     //Submit form
   function submitForm(){
      // e.preventDefault();
       uploadImage();
   }
$('#blog_image').on('change',function(event){
    selectedImage=event.target.files[0]
    console.log(selectedImage)
})


    })


    
function uploadImage(){
    const imagename= selectedImage.name;
    console.log('**************** '+ imagename)
   const storageRef = firebase.storage().ref("/images"+ imagename);
   console.log('**************** '+ storageRef)
   const imageRef=storageRef.child(imagename)

   const task = imageRef.put(selectedImage)
   task.then(snapshot=>{
        console.log(snapshot)
       return snapshot.ref.getDownloadURL();

   })
   .then(downloadURL => {
       console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
       const url=downloadURL;
      // document.querySelector('#imgUpload').setAttribute('src',url)
       return downloadURL;
    })
 
    .catch(error => {
       // Use to signal error if something goes wrong.
       console.log(`Failed to upload file and get link - ${error}`);
    });

}








  