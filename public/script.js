// Handle form submission
$('#loginForm').on('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission
  const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Get the form data
    var formData = {
      username: username, // Get the value entered in the username field
      password:password  // Get the value entered in the password field
    };
  
    // Send a POST request to the backend
    fetch('http://localhost:3000/api/users/login', { // Corrected URL with full protocol
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then(data => {
      // Redirect the user to user.html upon successful login
      window.location.href = './market.html';
    })
    .catch(error => {
      // Handle login error
      window.alert('Invalid username or password');
    
      // Example: display an error message to the user
      $('#loginErrorMessage').text('Invalid username or password');
    });
  });
  
  // Show login modal when the login button is clicked
  $('#loginBtn').on('click', function() {
    $('#loginModal').modal('show');
  });


  $(document).ready(function() {
    $('#loginLink').click(function() {
      $('#registerModal').modal('hide'); // Hide the register modal
      $('#loginModal').modal('show'); // Show the login modal
    });
  
    $('#registerLink').click(function() {
      $('#loginModal').modal('hide'); // Hide the login modal
      $('#registerModal').modal('show'); // Show the register modal
    });
  });
  
  