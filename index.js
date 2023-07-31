import { checkAuth } from './auth.js'


//fetch the item to be updated dynamically once the reponse is recived from the user.
const registerBtn = document.querySelector('#reg');
const loginBtn = document.querySelector("#signin");

//Do a function call checkAuth() to check if the user is logged in or not
try {
    checkAuth()
        .then(data => {
            //If the user is logged in then remove the register button and change login button to profile button by changing its text and its href
            if(data.status == 200 && data.user) {
                registerBtn.style.display = 'none'
                loginBtn.firstChild.textContent = `Hi, ${data.user.name}`
                loginBtn.href = './myprofile.html'
            }
        })
} catch(err) {

}