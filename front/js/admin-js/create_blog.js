document.getElementById("blog-form").addEventListener("submit", function (event) {
  event.preventDefault();
  let message='';
  const title = document.getElementById("blog-title");
  const body = document.getElementById("blog_body");
  const submitBtn = document.getElementById("submit_created_blog");
  const file = document.getElementById("blog_image").files[0];
  const loader = document.getElementById("uploader-image");
  const alertMessage = document.getElementById("error_message");
  var editor = CKEDITOR.replace( 'message' );
    editor.on( 'change', function( evt ) {
        // getData() returns CKEditor's HTML content.
        console.log( '+++++++++++++++++Total bytes: ' + evt.editor.getData().length );
        message= evt.editor.getData();
    });

  if(validate(title,message,alertMessage))
      return

  loader.style.display = "flex";
  const oldText = submitBtn.innerHTML;
  submitBtn.innerHTML = "Creating new article....";
  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('body',message);
  formData.append("image", file)
  fetch(BASE_URL + "/article/create", {
      method: "POST",
      headers: {
          Authorization: token
      },
      body: formData
  })
      .then(response => {
          if (response.ok) {
              submitBtn.innerHTML = oldText;
              document.getElementById("blog-form").reset();
              $('#blog_body').trumbowyg('html', "");
              alertMessage.innerHTML = "Article created successfully";
              alertMessage.style.display = "block";
              loader.style.display = "none";
          } else {
              if (response.status==401)
                  logout()
              throw Error("Error")
          }
      })
      .catch(function (error) {
          submitBtn.innerHTML = oldText;
          alertMessage.innerHTML = "Error while creating the article.";
          alertMessage.style.display = "block";
          loader.style.display = "none";
      });
})

function validate(title,message,error_message){
    
  var text;
  if(title.length < 5){
   error_message.style.padding = "10px";   
    text = "Title should be more than 5 characters";
    error_message.innerHTML = text;
    return false;
  }
  if(message.length >= 10 ||message==""){
      error_message.style.padding = "10px"; 
    text = "message should be more Than 10 Characters";
    error_message.innerHTML = text;
    return false;
  }
  return true;
}
