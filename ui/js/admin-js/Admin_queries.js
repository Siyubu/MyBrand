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

  displayAllQuerries();

})

  function displayAllQuerries(){
    var db=firebase.database().ref('contacts/');
    db.on('value',gotData,errData);
}

function gotData(data){
    var list = document.getElementById('blog-querries');
    var queries=data.val();
    var keys=Object.keys(queries)
    console.log('++++++++++++++++', keys);

    function makeh5(information) {
        //header
        var header = document.createElement('h5');
        var text = document.createTextNode(information)
        header.appendChild(text);
        return header;
      }

      function makeh4(information) {
        //header
        var header = document.createElement('h4');
        var text = document.createTextNode(information)
        header.appendChild(text);
        return header;
      }
    for(var i=0;i<keys.length;i++){
        var key=keys[i];

        var name=queries[key].name;
        var email=queries[key].email;
        var subject=queries[key].subject;
        var message=queries[key].message;

     /********create elements*******/

     //crate link
    
        var li=document.createElement('li');
        li.setAttribute('id',key);
        li.setAttribute('class',"querry");
        var h5_name=makeh5(name);
        h5_name.setAttribute('class','name  intro');
        var h5_email= makeh5(email);
        h5_email.setAttribute('class','email  intro');

        li.appendChild(h5_name);
        li.appendChild(h5_email);
        var sub=makeh4(subject);
        sub.setAttribute('class','subject intro');
        li.appendChild(sub);
        var par=document.createElement('p');
        par.innerHTML=message;
        li.appendChild(par)
        list.appendChild(li);

    }

}


function errData(err){
    console.log('error!');
    console.log(err)
}