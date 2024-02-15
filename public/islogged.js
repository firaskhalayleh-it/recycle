// Function to check if the user is logged in
function checkLoggedIn() {
    const usernameCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('username='));
    return !!usernameCookie; // Convert to boolean (true if cookie exists, false otherwise)
}

// Example usage: check if the user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    if (checkLoggedIn()) {
        console.log('User is logged in');
        // Perform actions for logged-in users
    } else {
        console.log('User is not logged in');
        // Redirect to login page or display login form
    }
});


