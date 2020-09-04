  // Your web app's Firebase configuration
 // Your web app's Firebase configuration
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
  const firebaseDatabase= firebase.database().ref("messages");
  

// listen for form submission
document.getElementById('log').addEventListener('submit',submitForm);

//Submit form
function submitForm(e){
    e.preventDefault();
    // Get Value and Authenticate
    var email = document.getElementById('user_email').value;
    var pswd = document.getElementById('user_password').value;
   login(email,pswd);
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


