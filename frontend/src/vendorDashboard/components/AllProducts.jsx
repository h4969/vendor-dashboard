
import React, { useState, useEffect } from "react";
import { API_URL } from "../data/apiPath";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchProducts = async () => {
    try {
      const firmId = localStorage.getItem("firmId");
      const token = localStorage.getItem("token");

      if (!firmId) throw new Error("No firm ID found. Please create a firm first.");

      const response = await fetch(`${API_URL}/Product/${firmId}/products`, {
        headers: { token, "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  
  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: "DELETE",
        headers: { token },
      });

      if (!response.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((p) => p._id !== productId));
      alert("Product deleted successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return <div>No products found</div>;

  return (
    <div className="product-container">
      <h2 className="heading">Your Products</h2>

      
      <div className="desktop-view">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>₹{item.price}</td>
                <td>{item.description || "—"}</td>
                <td>
                  {item.image && (
                    <img
                      src={`${API_URL}/uploads/${item.image}`}
                      alt={item.productName}
                      className="product-image"
                    />
                  )}
                </td>
                <td>
                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className="mobile-view">
        {products.map((item) => (
          <div className="product-card" key={item._id}>
            <img
              src={`${API_URL}/uploads/${item.image}`}
              alt={item.productName}
              className="product-card-image"
            />
            <div className="product-info">
              <h3>{item.productName}</h3>
              <p className="price">₹{item.price}</p>
              <p>{item.description || "—"}</p>
              <button
                onClick={() => deleteProduct(item._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
