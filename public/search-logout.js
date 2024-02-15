document.addEventListener('DOMContentLoaded', function () {
  const isLoggedIn = true; // Replace 'true' with your logic to check if the user is logged in

  const logoutBtn = document.getElementById('logoutBtn');
  const loginBtn = document.getElementById('login-btn'); // Get reference to login button
  const productsContainer = document.getElementById('productsContainer');
  const searchInput = document.getElementById('searchInput');
  const submitSearchBtn = document.getElementById('submitSearch'); // Get reference to submitSearch button

  // Show/hide buttons based on authentication status
  if (isLoggedIn) {
    submitSearchBtn.style.display = "block";
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none"; // Hide login button
  } else {
    submitSearchBtn.style.display = "none";
    logoutBtn.style.display = "none";
    loginBtn.style.display = "block"; // Show login button
  }

  logoutBtn.addEventListener('click', function () {
    fetch('http://localhost:3000/api/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Logout failed');
        }
        return response.text(); // Parse response as text
      })
      .then(data => {
        if (data === 'logged out') {
          window.location.href = './home.html';
        } else {
          throw new Error('Unexpected response from server');
        }
      })
      .catch(error => {
        // Handle logout error
        console.error('Error logging out:', error);
        window.alert('Error logging out');
      });
  });

  submitSearchBtn.addEventListener('click', searchProducts);

  function searchProducts() {
    const searchQuery = searchInput.value.trim();
    if (!searchQuery) {
      window.alert('Please enter a search query.');
      return;
    }

    fetch(`http://localhost:3000/api/product/${encodeURIComponent(searchQuery)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        return response.json(); // Parse response as JSON
      })
      .then(product => {
        renderProduct(product);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        // Optionally handle the error here
        window.alert('Error fetching product');
      });
  }

  function renderProduct(product) {
    // Clear the products container
    productsContainer.innerHTML = '';

    const imageUrl = product.image.replace(/\/\//g, '/');
    const card = createProductCard(product, imageUrl);
    productsContainer.appendChild(card);
  }

  function createProductCard(product, imageUrl) {
    const card = document.createElement('div');
    card.classList.add('col-lg-4');

    const cardInner = `
      <div class="card">
        <img src="../src/${imageUrl}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text">Price: ${product.price}</p>
          <p class="card-text">Quantity: ${product.quantity}</p>
          <p class="card-text">Provider: ${product.provider.username}</p>
          <a href="product.html?id=${product.id}" class="btn btn-primary">View Details</a>
        </div>
      </div>
    `;

    card.innerHTML = cardInner;
    return card;
  }
});
