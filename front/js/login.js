

  const token = localStorage.getItem("token")
if (token) {
    window.location = "html";
}

function login(event) {
    event.preventDefault();
    const emailInput = document.getElementById("user_email");
    const passwordInput = document.getElementById("user_password");
    const loginBtn = document.getElementById("login_submit_btn");

    loginBtn.innerText = "Logging in...";
    const email = emailInput.value;
    const password = passwordInput.value;
    const formData = new FormData();
    formData.append('password', password);
    formData.append('email', email);
    fetch(`${BASE_URL}/user/signin`, {method: "POST", body: formData})
        .then(response => {
            if (response.ok) {
                response.json().then(({data}) => {
                    localStorage.setItem("token", data.token)
                    window.location = "html/admin-panel-html/bloggers.html";
                })
                    .catch(() => {
                        throw Error("Error")
                    })

            } else {
                throw Error("Error")
            }
        })
        .catch(function (error) {
          document.getElementsByClassName("alert")[0].style.display = "inline-block";
            loginBtn.innerText = "Login";
        });
}



