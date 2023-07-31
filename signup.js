import { checkAuth } from './auth.js'
//TODO: Similar to signin page, first check if the user is already logged in or not before letting user access the registration page
//---------write your logic here-------------------

//First check if the user is already logged in and if so then it does not makes any sense to let the user access the singup page, so redirect the user to either index or profile page
try {
    checkAuth()
        .then(data => {
            if(!(data.status == 200 && data.user)) {
                //If there is no user data in the response received from the server (means the user is not logged in) then only attach the event listener to the login button
                document.getElementById("button").onclick = signup;
                return;
            }
            //Else user is logged in then redirect user to profile page 
            location.href = './myprofile.html'
        })
} catch(err) {
    //if some error occured while checking if the user is logged in or not then in that case redirect the user back to index page or you can display an error message
    location.href = './index.html'
}


//Signup logic
const msg = document.getElementById("msg");

async function signup(event) {
    event.preventDefault();

    const name = document.getElementById("inpName").value;
    const email = document.getElementById("inpEmail").value;
    const password = document.getElementById("inpPswd").value;
    const confirmPassword = document.getElementById("inpCnfrm").value;
    const terms = document.querySelector("[name='terms']").value;

    try {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password,
                confirmPassword,
                terms,
            }),
            headers: { "content-type": "application/json" },
        });

        // Parse the JSON response from the server
        const data = await res.json();

        if (data.success) {
            msg.style.display = "block";
            msg.style.color = "green";
            msg.textContent = "Successfully registered";
        } else {
            msg.style.display = "block";
            // If there's an error, display the error message to the user
            msg.textContent = data.msg;
        }
    } catch (error) {
        // Handle any errors that may occur during the fetch or parsing the response
        console.error("Error:", error);
    }
}


