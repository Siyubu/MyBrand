var urlParams;
var latitude;
var longitude;

var title;
var imageurl;
var body;
var likes;
var shares;
var commentNum;

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
     
      gotData();
      
    
    });
    window.onload = getLocation;
   

    // function displayBlogInFull(){
    //     var db=firebase.database().ref('blogs/')
    //     db.on('value', gotData,errData)

      
    // }

    function gotData(){
       
        var list = document.getElementById('blogFullMode');
        
        var id= urlParams.get('article');
          firebase.database().ref('blogs/'+id).on('value', function(snapshot){
                title=snapshot.val().title;
                imageurl=snapshot.val().image;
                body=snapshot.val().body;
                likes=snapshot.val().likes;
                shares=snapshot.val().shares;
                commentNum=Object.keys(snapshot.val().comments);

                list.innerHTML=` 
                <div class="title" >${title}</div>
                <div class="image">
                <img  id="blog-image"  class="blog-image"  src=${imageurl}  alt="Blog">
                </div>
                <div class='content'>
                <p> ${body}</p>
                </div>
               `;
               for(var j=0;j<commentNum.length;j++){
                var commentKey=commentNum[j];
                var commentName=snapshot.val().comments[commentKey].name;
                var commentBody=snapshot.val().comments[commentKey].comment;

                document.getElementById('blog-comment').innerHTML +=`  
                 <li class='comment'>
                <h5 class="name"> <strong>${commentName}</strong></h5>
               <p>${ commentBody}</p>
           </li>`  
            }

            document.getElementById("like-icon-number").innerHTML=likes;
            document.getElementById("share-icon-number").innerHTML=shares;
            document.getElementById("comment-number").innerHTML=commentNum.length;
            
        }); 
        
        }
   // }
    // document.getElementById("total-likes").innerHTML=total_likes;
    // document.getElementById("total-shares").innerHTML=total_shares

    function errData(err){
        console.log('error!');
        console.log(err)
    }

    function comment(e){
        e.preventDefault();
        getLocation();
       document.getElementById('blog-comment').innerHTML='';
        var id= urlParams.get('article');
        firebase.database().ref('blogs/'+id+ '/comments/').push().set({
            name: document.getElementById("name").value,
            comment: document.getElementById("comment").value,
            location: {latitude:latitude,
                        longitude:longitude
                    }

    });
   // location.href = `blog_full_mode?article=${id}`;
    //document.getElementById("comment-form").reset();
    }
    

    function like(e){
        e.preventDefault();
        var initial_likes;
        var likes=0;
        var id= urlParams.get('article');

        firebase.database().ref('blogs/'+id).on('value', function(snapshot){
            initial_likes= snapshot.val().likes;
    });

    if( initial_likes!=null)
    {
        likes=1 + initial_likes;
    }
    firebase.database().ref('blogs/'+id).update({
        likes: likes       
    });
    document.getElementById("like-icon-number").innerHTML=likes
    }

    function share(e){
        e.preventDefault();
        var initial_shares;
        var shares=0;
        var id= urlParams.get('article');
        firebase.database().ref('blogs/'+id).on('value', function(snapshot){
            initial_shares= snapshot.val().shares;
    });

    if( initial_shares!=null)
    {
        shares = 1 + initial_shares;
    }
    firebase.database().ref('blogs/'+id).update({
        shares: shares       
    });
    document.getElementById("share-icon-number").innerHTML=shares;
    }

    
   // window.onload = getLocation;
   function getLocation() {
    if (navigator.geolocation) { 

     return navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    latitude= position.coords.latitude;
    longitude=position.coords.longitude;
  }
    