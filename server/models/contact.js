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

  function submitForm(e){
    e.preventDefault();
    var name = document.getElementById("user_name").value;
    var subject = document.getElementById("subject").value;
    var email = document.getElementById("user_email").value;
    var message = document.getElementById("user_message").value;
    var error_message = document.getElementById("error_message");
    if(validate(name,subject,email,message,error_message)){
        storeContactIntoDatabase(e,name,subject,email,message);
        error_message.style.background="blue";
        error_message.style.padding = "10px";
        error_message.innerHTML = "Form Submitted and data saved Successfully!";

        document.getElementById("contact-form").reset();

    }
}


    /*-------- Function for input validation----------- */

function validate(name,subject,email,message,error_message){
    
    var text;
    if(name.length < 5){
     error_message.style.padding = "10px";   
      text = "Name should be more than 5 characters";
      error_message.innerHTML = text;
      return false;
    }
    if(subject.length < 10){
      error_message.style.padding = "10px"; 
      text = "Subject should be more than 10 characters";
      error_message.innerHTML = text;
      return false;
    }
    if(email.indexOf("@") == -1 || email.length < 6){
      error_message.style.padding = "10px"; 
      text = "Please Enter valid Email";
      error_message.innerHTML = text;
      return false;
    }
    if(message.length <= 10){
        error_message.style.padding = "10px"; 
      text = "Please Enter More Than 100 Characters";
      error_message.innerHTML = text;
      return false;
    }
    return true;
  }


  /*-------- Function to stora data into database---------------- */
  function storeContactIntoDatabase(e,name,subject,email,message){
    e.preventDefault();
    var db=firebase.database();
    var postkey=db.ref('contacts/').push().key;
    console.log(postkey)
//    var postkey= firebase.database().ref().child('posts').push().key
    var postData={
        name:name,
        subject:subject,
        email:email,
        message:message,

    }
    var updates={};
    updates['/contacts/'+ postkey]=postData;
    console.log("Saved in database sucessfylly");
    
   return firebase.database().ref().update(updates);


}
