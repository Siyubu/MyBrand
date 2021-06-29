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
      getContactData();
    
    });
    var total_shares=0;
    var total_comments=0;
    var total_likes=0;

    function displayAllBlogs(){
        var db=firebase.database().ref('blogs/')
        db.on('value', gotData,errData)

    }

    function gotData(data){
        var list = document.getElementById('blog-grid');
        var blogs=data.val();
        var keys=Object.keys(blogs)
        console.log(keys);
        for(var i=0;i<keys.length;i++){
            var key=keys[i];
            var title=blogs[key].title;
            var imageurl=blogs[key].image;
            var shares=blogs[key].shares;
            var likes=blogs[key].likes;
            var comment=Object.keys(blogs[key].comments);
            var body=blogs[key].body;

         /********create elements*******/

         //crate link
            var link=document.createElement('a');
            link.href=`./blog/html/blogFullMode.html?article=${key}`;
            link.target="blank";
            link.setAttribute('id',key);
            link.setAttribute('class',"blog blog-tile");

            //create image

          var img = document.createElement('img');
          img.src=imageurl;
          img.setAttribute('class',"blog-image");
          img.alt="Blog";
          //create Paragraph
            var para = document.createElement("P");            
            para.innerHTML = title;
            para.setAttribute('class',"blog-title");
            //complete link
            link.appendChild(img);
            link.appendChild(para);
            // create icons
            var icon=document.createElement("div")
            icon.setAttribute("class","icon");
            // Button 
            var button1= document.createElement("button");
            button1.setAttribute("style","font-size:10px");
            button1.innerHTML= likes+" Likes";
            var i1=document.createElement("i");
            i1.setAttribute("class","fa fa-thumbs-up");
            button1.appendChild(i1);
            icon.appendChild(button1);

            // Button 
            var button2= document.createElement("button");
            button2.setAttribute("style","font-size:10px");
            button2.innerHTML=shares +" Shares";
            var i2=document.createElement("i");
            i2.setAttribute("class","fa fa-share-square-o");
            button2.appendChild(i2);
            icon.appendChild(button2);

             // Button 
             var button3= document.createElement("button");
             button3.setAttribute("style","font-size:10px");
             button3.innerHTML=comment.length+" Comment ";
             var i3=document.createElement("i");
             i3.setAttribute("class","fa fa-comment-o");
             button3.appendChild(i3);
             icon.appendChild(button3);

            link.appendChild(icon);
            // append on main div
            list.appendChild(link);

            total_likes=total_likes+likes;
            total_shares=total_shares+shares;
            total_comments=total_comments+comment.length;

        }
        document.getElementById("total-likes").innerHTML=total_likes;
        document.getElementById("total-shares").innerHTML=total_shares;
        document.getElementById("total-comments").innerHTML=total_comments;

    }
  



    function errData(err){
        console.log('error!');
        console.log(err)
    }
    function getComment(id){
      var comments=  firebase.database().ref('blogs/'+id+ '/comments/');
      return Object.keys(comments)
    }
    
    function getContactData(){
      var db=firebase.database().ref('contacts/')
      db.on('value', gotContactData,errData)

  }
  function gotContactData(data){
    var contact=data.val();
    var keys=Object.keys(contact);
    document.getElementById('total-contact').innerHTML=keys.length;
  }