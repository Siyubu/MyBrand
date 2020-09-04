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
      displayAllBlogs();
    
    
    });

    function displayAllBlogs(){
        var db=firebase.database().ref('blogs/');
        document.getElementById('blog-list').innerHTML='';
        db.on('value', gotData,errData)

    }

    function gotData(data){
        var list = document.getElementById('blog-list');
        var blogs=data.val();
        var keys=Object.keys(blogs)
        console.log(keys);
        for(var i=0;i<keys.length;i++){

            var key=keys[i];
            var title=blogs[key].title;
            var imageurl=blogs[key].image;
            var body=blogs[key].body;

            list.innerHTML+=`
            <div class="blog">
            <img class="blog-image"  src=${imageurl} alt="Blog Image"> 
            <div class='right'>
                <a href="./blog_full_mode.html?article=${key}" target="blank"  class=" blog-tile"><p>${title}</p> </a>
                    <div class="icon">
                        <button id="like" style="font-size:14px">Like <i class="fa fa-thumbs-up"></i></button>
                        <button id="share" style="font-size:14px">Share <i class="fa fa-share-square-o"></i></button>  
                    </div>
            </div>
        </div>
        <hr />`;
        }

    }

    function errData(err){
        console.log('error!');
        console.log(err)
    }