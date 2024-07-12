// scripts/auth.js
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform login logic here (e.g., send request to server)
    console.log(`Logging in with ${email} and ${password}`);
}

// Handle the Google sign-in response
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    // Perform your login logic here (e.g., send token to server)
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID',
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.querySelector('.g_id_signin'),
        { theme: 'outline', size: 'large' }  // customization attributes
    );
    google.accounts.id.prompt(); // Display the One Tap prompt
}
