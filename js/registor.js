const elSiteForm = document.querySelector(".site-form");

const elUserName = document.querySelector('.fite-form__name')

const elUserNum = document.querySelector('.fite-form__num')
const elUserEmail = document.querySelector('.fite-form__email')
const elUserPass = document.querySelector('.fite-form__pas')



async function register(){

    try {
      const response = await fetch(`http://${IP4}:5000/user/register`, {
      method: "POST",
  
      headers:{
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify(
        {
            user_name: elUserName.value.trim(),
            phone: elUserNum.value.trim(),
            email: elUserEmail.value.trim(),
            password: elUserPass.value.trim()
  
        }
        )
      })
  
      const data = await response.json();
  
      console.log(data);
      if (data.message== 'This email already exists') {
          alert("This email already exists")
      }

      if(data.token){
        window.localStorage.setItem("token-register", data.token);

        window.location.pathname = "index.html";
      }
  
    } catch (error) {
      console.log(error);
    }
  
  }
  
  
  elSiteForm.addEventListener("submit", (evt)=>{
    evt.preventDefault();
  
    register()
  
  })