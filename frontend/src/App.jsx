import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./vendorDashboard/components/NavBar";
import SideBar from "./vendorDashboard/components/SideBar";
import Footer from "./vendorDashboard/components/Footer";

import LandingPage from "./vendorDashboard/pages/LandingPage";
import Welcome from "./vendorDashboard/pages/Welcome";
import Login from "./vendorDashboard/components/forms/Login";
import Register from "./vendorDashboard/components/forms/Register";
import AddFirm from "./vendorDashboard/components/forms/AddFirm";
import AddProduct from "./vendorDashboard/components/forms/AddProduct";
import AllProducts from "./vendorDashboard/components/AllProducts";
import NotFound from "./vendorDashboard/components/forms/NotFound";
import "./App.css";

const App = () => {
  const loginToken = localStorage.getItem("loginToken");
  const firmName = localStorage.getItem("firmName");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Pages where sidebar should be hidden
  const noSidebarRoutes = ["/", "/login", "/register", "/welcome"];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      <NavBar onToggleSidebar={setSidebarOpen} showNavLinks={!showSidebar} />

      <div className="main-section">
        {showSidebar && (
          <SideBar showFirmTitle={!firmName} isOpen={sidebarOpen} />
        )}

        <div className={`collectionSection ${!showSidebar ? "full-width" : ""}`}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={<Register showLoginHandler={() => (window.location.href = "/login")} />}
            />
            {loginToken && (
              <>
                <Route path="/add-firm" element={<AddFirm />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/all-products" element={<AllProducts />} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;