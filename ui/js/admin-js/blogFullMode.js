var urlParams;
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
      var id= urlParams.get('article');
      
      displayBlogInFull();
     selectElement();
    });

    function displayBlogInFull(){
        var db=firebase.database().ref('blogs/')
        db.on('value', gotData,errData)
    }

    function gotData(data){
        
        //const myParam = urlParams.get('article')
        var list = document.getElementById('fullMode');
        var blogs=data.val();
        var keys=Object.keys(blogs)
        var id= urlParams.get('article');
        for(var i=0;i<keys.length;i++){
            if(id==keys[i]){
                var title=blogs[id].title;
                var imageurl=blogs[id].image;
                var body=blogs[id].body;
                var comment=Object.keys(blogs[id].comments);

                list.innerHTML=` 
                <div class="title" >${title}</div>
                <div class="image">
                <img  id="blog-image"  class="blog-image"  src=${imageurl}  alt="Blog">
                </div>
                <div class='content'>
                <p> ${body}</p>
                </div>
               `;
        
                for(var j=0;j<comment.length;j++){
                    var commentKey=comment[j];
                    var commentName=blogs[id].comments[commentKey].name;
                    var commentBody=blogs[id].comments[commentKey].comment;
                    document.getElementById('blog-comment').innerHTML+=`  
                     <li class='comment'>
                    <h5 class="name"> <strong>${commentName}</strong></h5>
                   <p>${ commentBody}</p>
               </li>`
                   // console.log(commentBody);
                }
            
            } 
           
         /********create elements*******/
        

        }

    }
    function errData(err){
        console.log('error!');
        console.log(err)
    }

    
    function deleteIteme(e){
        e.preventDefault();
        var id= urlParams.get('article');
        document.getElementById('delete').onclick=function(){
            firebase.database().ref('blogs/'+id).remove();
            location.href = "../../bloggers.html";
    }
    }

    function selectElement(e){
        e.preventDefault();
        var id= urlParams.get('article');
        location.href = `admin_edit.html?edit=${id}`;
    }

    