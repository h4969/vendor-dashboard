import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">🍽️ Built for restaurant vendors</span>
          <h1 className="hero-title">
            Run your restaurant <br />
            <span className="hero-highlight">smarter, not harder</span>
          </h1>
          <p className="hero-subtitle">
            Add your firm, manage your menu, track bestsellers — everything you need in one clean dashboard.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate("/register")}>
              Get started free
            </button>
            <button className="btn-ghost" onClick={() => navigate("/login")}>
              Sign in →
            </button>
          </div>
        </div>

        {/* Floating stats */}
        <div className="hero-stats">
          <div className="stat-pill">
            <span className="stat-num">500+</span>
            <span className="stat-label">Vendors</span>
          </div>
          <div className="stat-pill">
            <span className="stat-num">2k+</span>
            <span className="stat-label">Products</span>
          </div>
          <div className="stat-pill">
            <span className="stat-num">10+</span>
            <span className="stat-label">Categories</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <p className="section-eyebrow">WHAT YOU GET</p>
        <h2 className="section-title">Everything a vendor needs</h2>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏪</div>
            <h3>Firm management</h3>
            <p>Register your restaurant, set your area, category, and special offers in minutes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🍱</div>
            <h3>Menu builder</h3>
            <p>Add products with images, prices, and descriptions. Keep your menu always up to date.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Bestseller tags</h3>
            <p>Mark your most popular dishes so customers know what to order first.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Secure access</h3>
            <p>Each vendor gets their own secure login. Your data stays private and protected.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="steps-section">
        <p className="section-eyebrow">HOW IT WORKS</p>
        <h2 className="section-title">Up and running in 3 steps</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Create an account</h3>
            <p>Register with your email and password. Takes less than a minute.</p>
          </div>
          <div className="step-connector">→</div>
          <div className="step-card">
            <div className="step-number">02</div>
            <h3>Add your firm</h3>
            <p>Enter your restaurant name, area, category, and upload a photo.</p>
          </div>
          <div className="step-connector">→</div>
          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Start adding products</h3>
            <p>Build your menu and manage it anytime from your dashboard.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to manage your restaurant?</h2>
        <p>Join hundreds of vendors already using the dashboard.</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate("/register")}>
            Create your account
          </button>
          <button className="btn-ghost" onClick={() => navigate("/login")}>
            Already have an account? Sign in
          </button>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
