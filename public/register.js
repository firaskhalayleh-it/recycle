document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
      event.preventDefault();
      var formData = {
        username: document.getElementById('newUsername').value,
        password: document.getElementById('newPassword').value,
        confirm_password: document.getElementById('confirmPassword').value,
        first_name: document.getElementById('firstName').value,
        last_name: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        telephone: document.getElementById('telephone').value
      };
      
      fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle success
        // Redirect the user to the home page upon successful registration
        window.location.href = './home.html';
        console.log('Registration successful');
      })
      .catch(error => {
        // Handle error
        // Example: display an error message to the user
        document.getElementById('registerErrorMessage').textContent = error.message;
        console.error('Error:', error);
      });
    });
});
