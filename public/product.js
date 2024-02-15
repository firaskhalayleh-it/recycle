function fetchProducts() {
    fetch('http://localhost:3000/api/products')
      .then(response => {
        console.log('Response:', response); // Log the response object
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(products => {
        console.log('Products fetched:', products);
        if (products.length === 0) {
          console.log('No products found');
        } else {
            displayProducts(products);
            return products;
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }
// Function to display products in cards
// Function to display products in cards
 const displayProducts= (products)=> {
    const productsContainer = document.getElementById('productsContainer');
    let row;
  
    products.forEach((product, index) => {
        // Start a new row for every third product
        if (index % 3 === 0) {
          row = document.createElement('div');
          row.className = 'row mb-3';
          productsContainer.appendChild(row);
        }
    
        const categories = product.categories && Array.isArray(product.categories)
          ? product.categories.map(category => category.name).join(', ')
          : 'No categories';
    
        // Normalize the image URL by replacing double slashes with a single slash
        const imageUrl = product.image.replace(/\/\//g, '/');
    
        const card = `
          <div class="col-lg-4">
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
          </div>
        `;
        
        // Append the card to the current row
        row.innerHTML += card;
      });
  }
  
  // Helper function to create DOM element from HTML string
  function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }
  
  
  // Call fetchProducts when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
  });

  export default displayProducts;