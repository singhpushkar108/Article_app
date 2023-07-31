import { checkAuth } from './auth.js'

//Fetch all html elements that has to be updated dynamically after server responses with user data
const msg = document.getElementById("hello");
const main= document.querySelector("#main");
const logoutBtn = document.querySelector("#logoutBtn");


//Logout function
const logout = async () => {
    try {
        const res = await fetch('/api/auth/signout', { method: 'POST' })
        const data = await res.json()

        if(data.status == 200 && data.success) {
            alert('Logged out successfully!')
            location.href = './index.html'
        }
    } catch(err) {
        alert(err.message || "Something went wrong!")
    }
}


 //Call func checkAuth() defined in auth.js to check if the user is logged in.
try {
     checkAuth().then((data) => {
        if (data.status == 200 && data.user) {
            //If the user is logged in then update required elements dynamically and activate logout button(activate means attach event listener for logout)
            msg.textContent = `Hi, ${data.user.name}`;
            main.style.display= "flex";
            
            //Attach logout event handler for logout button
            logoutBtn.addEventListener('click', logout)
        } else {
            msg.textContent = data.msg
        }
     });
} catch(err) {
    msg.textContent = err.message || "Something went wrong!"
}
