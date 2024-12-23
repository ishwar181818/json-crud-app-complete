import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  // Fetch products from the server (mock server at http://localhost:5000/products)
  const fetchProducts = () => {
    axios.get('http://localhost:5000/products')
      .then((response) => {
        setProducts(response.data); // Assuming the data is an array of products
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  // Call this function when the component mounts to load products
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to delete a product by ID
  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          // On successful deletion, filter out the deleted product from the state
          setProducts(products.filter(product => product.id !== id));
          alert('Product deleted successfully!');
        }
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
      });
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 card mt-4 p-3">
        <h1 className="text-center fs-3">
          <i className="bi bi-shop"></i> Product List
        </h1>
        <ul className="list-group">
          {products.map((product) => (
            <li key={product.id} className="list-group-item d-flex justify-content-between">
              <div>
                <strong>{product.productName}</strong>
                <p>{product.description}</p>
                <p>Price: ₹{product.price}</p>
                <p>Available Stock: {product.availableStock}</p>
                <p>Manufacturer: {product.manufacturer}</p>
                <p>Product Available: {product.isAvailable ? 'Available' : 'Not Available'}</p>
              </div>
              <button
                onClick={() => deleteProduct(product.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductList;
