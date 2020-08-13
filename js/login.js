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
  const firebaseDatabase= firebase.database().ref("messages");
  

// listen for form submission
document.getElementById('login').addEventListener('submit',submitForm);


//Submit form
function submitForm(e){
    e.preventDefault();
    // Get Value and Authenticate
    var email = document.getElementById('user_email').value;
    var pswd = document.getElementById('user_password').value;
   login(email,pswd);

   // reset the form after 3 seconds

//    setTimeout(function(){
//     document.getElementById("login").reset();
// }, 7000);
}

// save to firebase
function saveLogins(email, pswd){
    var loginsInDatabase=firebaseDatabase.push();
    loginsInDatabase.set({
        Email: email,
        Password: pswd
    })
}
function login(email,password){
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(function(nextPage){
        document.querySelector('#login_submit_btn').setAttribute("onclick","location.href='bloggers.html' ")
    })
    .catch(function(error) {
      // Handle Errors here.
      document.querySelector('.alert').style.display='block';
      // ...
    });
  
  }


// clear my form
//---------------document.getElementById('form Id').reset()


