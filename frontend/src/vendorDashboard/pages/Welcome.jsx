// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Welcome.css";

// const Welcome = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="welcome-container">
//       <div className="welcome-card">
//         <h1 className="welcome-title">Welcome to Vendor Dashboard</h1>
//         <p className="welcome-subtitle">
//           Manage your products, track sales, and grow your business with ease.
//         </p>
//         <div className="welcome-buttons">
//           <button className="btn login-btn" onClick={() => navigate("/login")}>
//             Login
//           </button>
//           <button
//             className="btn register-btn"
//             onClick={() => navigate("/register")}
//           >
//             Register
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Welcome;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../data/apiPath";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [firm, setFirm] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const vendorId = localStorage.getItem("vendorId");
  const firmId = localStorage.getItem("firmId");
  const loginToken = localStorage.getItem("loginToken");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch vendor details
        if (vendorId) {
          const vRes = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
          const vData = await vRes.json();
          setVendor(vData.vendor);
          if (vData.vendor?.firm?.length > 0) {
            setFirm(vData.vendor.firm[0]);
          }
        }

        // Fetch products
        if (firmId) {
          const pRes = await fetch(`${API_URL}/product/${firmId}/products`);
          const pData = await pRes.json();
          setProducts(pData.products || []);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [vendorId, firmId, loginToken]);

  const bestsellers = products.filter((p) => p.bestSeller);
  const vegProducts = products.filter((p) => p.category === "veg");
  const nonVegProducts = products.filter((p) => p.category === "non-veg");

  if (loading) {
    return (
      <div className="dash-loading">
        <div className="dash-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dash-wrapper">

      {/* Greeting Banner */}
      <div className="dash-greeting">
        <div>
          <h1>{getGreeting()}, {vendor?.username || "Vendor"} 👋</h1>
          <p>Here's an overview of your restaurant today.</p>
        </div>
        <div className="dash-date">
          {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* Stats Cards */}
      <p className="dash-eyebrow">OVERVIEW</p>
      <div className="dash-stats">
        <div className="stat-card">
          <div className="stat-icon">🍱</div>
          <div className="stat-label">Total Products</div>
          <div className="stat-value">{products.length}</div>
          <div className="stat-sub">on your menu</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-label">Bestsellers</div>
          <div className="stat-value">{bestsellers.length}</div>
          <div className="stat-sub">marked items</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🥦</div>
          <div className="stat-label">Veg Items</div>
          <div className="stat-value">{vegProducts.length}</div>
          <div className="stat-sub">vegetarian</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🍗</div>
          <div className="stat-label">Non-Veg Items</div>
          <div className="stat-value">{nonVegProducts.length}</div>
          <div className="stat-sub">non-vegetarian</div>
        </div>
      </div>

      {/* Firm Card */}
      <p className="dash-eyebrow">YOUR FIRM</p>
      {firm ? (
        <div className="firm-card">
          <div className="firm-avatar">🏪</div>
          <div className="firm-info">
            <h3>{firm.firmName}</h3>
            <p>
              {Array.isArray(firm.region) ? firm.region.join(", ") : firm.region}
              {firm.area ? ` · ${firm.area}` : ""}
              {firm.offer ? ` · 🏷️ ${firm.offer}` : ""}
            </p>
            <div className="firm-tags">
              {Array.isArray(firm.category) && firm.category.map((c) => (
                <span key={c} className="firm-tag">{c}</span>
              ))}
            </div>
          </div>
          <div className="firm-badge">✓ Active</div>
        </div>
      ) : (
        <div className="no-firm-banner">
          <span>⚠️ You haven't added a firm yet.</span>
          <button onClick={() => navigate("/add-firm")}>Add firm →</button>
        </div>
      )}

      {/* Quick Actions */}
      <p className="dash-eyebrow">QUICK ACTIONS</p>
      <div className="dash-actions">
        <div className="action-card" onClick={() => navigate("/add-product")}>
          <div className="action-icon">➕</div>
          <div className="action-name">Add Product</div>
          <div className="action-desc">Add a new menu item</div>
        </div>
        <div className="action-card" onClick={() => navigate("/all-products")}>
          <div className="action-icon">📋</div>
          <div className="action-name">All Products</div>
          <div className="action-desc">View & manage menu</div>
        </div>
        <div className="action-card" onClick={() => navigate("/add-firm")}>
          <div className="action-icon">🏪</div>
          <div className="action-name">{firm ? "View Firm" : "Add Firm"}</div>
          <div className="action-desc">{firm ? "Your firm details" : "Register your firm"}</div>
        </div>
        <div className="action-card account" onClick={() => {}}>
          <div className="action-icon">👤</div>
          <div className="action-name">Account</div>
          <div className="action-desc">{vendor?.email}</div>
        </div>
      </div>

      {/* Recent Products */}
      <p className="dash-eyebrow">RECENT PRODUCTS</p>
      {products.length > 0 ? (
        <div className="products-list">
          {products.slice(0, 5).map((product) => (
            <div className="product-row" key={product._id}>
              <div className="product-left">
                {product.image ? (
                  <img
                    src={`${API_URL}/uploads/${product.image}`}
                    alt={product.productName}
                    className="product-thumb"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="product-thumb-placeholder">🍽️</div>
                )}
                <div>
                  <div className="product-name">{product.productName}</div>
                  {product.description && (
                    <div className="product-desc">{product.description.slice(0, 40)}...</div>
                  )}
                </div>
              </div>
              <div className="product-right">
                {product.bestSeller && <span className="tag tag-best">⭐ Bestseller</span>}
                <span className={`tag tag-cat ${product.category === "veg" ? "tag-veg" : "tag-nonveg"}`}>
                  {product.category}
                </span>
                <span className="product-price">₹{product.price}</span>
              </div>
            </div>
          ))}
          {products.length > 5 && (
            <button className="view-all-btn" onClick={() => navigate("/all-products")}>
              View all {products.length} products →
            </button>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🍽️</div>
          <p>No products yet. Start building your menu!</p>
          <button onClick={() => navigate("/add-product")}>Add your first product →</button>
        </div>
      )}

    </div>
  );
};

export default Welcome;
