import { checkAuth } from './auth.js'

//First check if the user is already logged in and if so then it does not makes any sense to let the user access the login page, so redirect the user to either index or profile page
try {
    checkAuth()
        .then(data => {
            if(!(data.status == 200 && data.user)) {
                //If there is no user data in the response received from the server (means the user is not logged in) then only attach the event listener to the login button
                document.getElementById("button").onclick = login;
                return;
            }
            //Else user is logged in then redirect user to profile page 
            location.href = './myprofile.html'
        })
} catch(err) {
    //if some error occured while checking if the user is logged in or not then in that case redirect the user back to index page or you can display an error message
    location.href = './index.html'
}


const msg = document.getElementById("msg");

async function login(event) {
    event.preventDefault();

    let email = document.getElementById("inpEmail").value;
    email = email.toLowerCase();
    const password = document.getElementById("inpPswd").value;

    try {
        const res = await fetch("/api/auth/signin", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "content-type": "application/json" },
        });

        // Parse the JSON response from the server
        const data = await res.json();

        if (data.success) {
            //If login is complete then redirect the user to profile page
            window.location.href = "./myprofile.html";
        } else {
            // If there's an error, display the error message to the user
            msg.style.display = "block";
            msg.textContent = data.msg;
        }
    } catch (error) {
        // Handle any errors that may occur during the fetch or parsing the response
        console.error("Error:", error);
    }
}
