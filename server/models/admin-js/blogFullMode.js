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
    //  deleteIteme(id);
     // updateElement();
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
                   //create image
                   var imgdiv=document.createElement('div');
                   imgdiv.setAttribute("class","image");

                   var img = document.createElement('img');
                   img.src=imageurl;
                   img.setAttribute("id","blog-image")
                   img.setAttribute('class',"blog-image");
                   img.alt="Blog";
                   imgdiv.appendChild(img);

                   //create Paragraph
                   var contdiv=document.createElement('div');
                   contdiv.setAttribute("class","content");
                   var para = document.createElement("P"); 
                   para.innerHTML = body;
                   para.setAttribute('class',"blog-title");
                   //complete link
                   contdiv.appendChild(para);
                   // create icons
                  list.appendChild(imgdiv);
                  list.appendChild(contdiv);
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
            location.href = "admin_delete.html";
           // alert("Deleted from the database")
    }
    }

    function selectElement(e){
        e.preventDefault;
        var id= urlParams.get('article');
            console.log("&&&&&&&&&&&&&&&&& "+ id);
        location.href = `admin_edit.html?edit=${id}`;
    }

    