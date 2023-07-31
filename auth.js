export const checkAuth = async () => {
    try {
        // Do a server request to check if the user is valid and logged in or not by checking the jwt token sent through the request
        const res = await fetch("/api/auth/authenticate", {
            method: "POST",
        });

        // Parse the JSON response from the server
        const data = await res.json()

        // Return user data if the user is already logged in or not as responded by server
        return data
        
    } catch (error) {
        // Handle any errors that may occur during the fetch or parsing the response
        return error
    }
}
