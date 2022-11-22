const elForm = document.querySelector(".site-form");
const elFormInputEmail = elForm.querySelector(".fite-form__email");
const elFormInputPassword = elForm.querySelector(".fite-form__pas");


async function login(){

  try {
    const response = await fetch(`http://${IP4}:5000/user/login`, {
    method: "POST",

    headers:{
      "Content-Type": "application/json",
    },

    body: JSON.stringify(
      {
        email: elFormInputEmail.value.trim(),
        password: elFormInputPassword.value.trim()
      }
      )
    })

    const data = await response.json();
    if (data.message=="User is not found") {
        alert("Password or Email not true")
    }
    
    if(data.token){
      window.localStorage.setItem("token-login", data.token);
      window.location.pathname = "index.html";
    }

  } catch (error) {
    console.log(error);
  }

}


if (!tokenRegistor) {
  window.location.pathname = "registor.html";
}

elForm.addEventListener("submit", (evt)=>{
  evt.preventDefault();

  login()

})