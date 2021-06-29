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
      getLocation();
    });

    window.onload = getLocation;

    function getLocation() {
        if (navigator.geolocation) { 
      
           navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
          alert("Geolocation is not supported by this browser.");
        }
      }
      
        function showPosition(position) {
            var db=firebase.database();
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var today = new Date().toISOString().slice(0, 10);
            console.log(today);
            console.log(longitude);
            console.log(latitude);
            var userkey=db.ref('visitors/').push().key;
            console.log(userkey);
             var postData={
                 latitude:latitude,
                 longitude:longitude,
                 created_at: today
                }
    var updates={};
    updates['/visitors/'+ userkey]=postData;
    console.log("Saved in database sucessfylly");

          
        }