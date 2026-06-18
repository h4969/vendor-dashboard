import React, { useState, useEffect } from "react";
import { API_URL } from "../data/apiPath";
import "../../App.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const firmId = localStorage.getItem("firmId");
      const token = localStorage.getItem("loginToken");

      if (!firmId) throw new Error("No firm ID found. Please create a firm first.");

      const response = await fetch(`${API_URL}/product/${firmId}/products`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch products");
      }

      const data = await response.json();
      const sorted = (data.products || []).sort(
        (a, b) => (b.bestSeller === true) - (a.bestSeller === true)
      );
      setProducts(sorted);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("loginToken");
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((p) => p._id !== productId));
      alert("Product deleted successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleFamous = async (productId, currentStatus) => {
    try {
      const token = localStorage.getItem("loginToken");
      const response = await fetch(`${API_URL}/product/${productId}/toggle-bestseller`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bestSeller: !currentStatus }),
      });

      if (!response.ok) throw new Error("Failed to update");

      setProducts((prev) =>
        prev
          .map((p) => (p._id === productId ? { ...p, bestSeller: !currentStatus } : p))
          .sort((a, b) => (b.bestSeller === true) - (a.bestSeller === true))
      );
    } catch (error) {
      alert("Couldn't update famous dish status. " + error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="status-msg">Loading products...</div>;
  if (error) return <div className="status-msg error">Error: {error}</div>;
  if (products.length === 0) return <div className="status-msg">No products found</div>;

  return (
    <div className="product-container">
      <h2 className="heading">Your Products</h2>

      <div className="product-table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Description</th>
              <th>Famous Dish</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id} className={item.bestSeller ? "famous-row" : ""}>
                <td>
                  {item.image ? (
                    <img
                      src={`${API_URL}/uploads/${item.image}`}
                      alt={item.productName}
                      className="product-image"
                    />
                  ) : (
                    <div className="product-image placeholder">🍽️</div>
                  )}
                </td>
                <td className="product-name-cell">
                  {item.productName}
                  {item.bestSeller && <span className="famous-badge">⭐ Famous</span>}
                </td>
                <td className="price-cell">₹{item.price}</td>
                <td className="desc-cell">{item.description || "—"}</td>
                <td>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={!!item.bestSeller}
                      onChange={() => toggleFamous(item._id, item.bestSeller)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn" onClick={() => deleteProduct(item._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;