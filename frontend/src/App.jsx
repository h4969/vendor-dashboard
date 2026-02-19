

// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import LandingPage from './vendorDashboard/pages/LandingPage';
// import AddFirm from './vendorDashboard/components/forms/AddFirm';
// import AddProduct from './vendorDashboard/components/forms/AddProduct';
// import AllProducts from './vendorDashboard/components/AllProducts';
// import Login from './vendorDashboard/components/forms/Login';
// import Register from './vendorDashboard/components/forms/Register';
// import Welcome from './vendorDashboard/pages/Welcome';
// import NotFound from './vendorDashboard/components/forms/NotFound';
// import NavBar from './vendorDashboard/components/NavBar';
// import SideBar from './vendorDashboard/components/SideBar';
// import Layout from './vendorDashboard/components/Layout';
// import './App.css';

// const App = () => {
//   const loginToken = localStorage.getItem('loginToken');
//   const firmName = localStorage.getItem('firmName');
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="app-container">
//       {/* Navbar */}
//       <NavBar onToggleSidebar={setSidebarOpen} />

//       <div className="main-section">
//         {/* Sidebar */}
//         <SideBar showFirmTitle={!firmName} isOpen={sidebarOpen} />

//         {/* Main content area */}
//         <div className="collectionSection">
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/welcome" element={<Welcome />} />
//             <Route path="/login" element={<Login />} />
//             <Route
//               path="/register"
//               element={<Register showLoginHandler={() => (window.location.href = '/login')} />}
//             />

//             {/* Protected Routes */}
//             {loginToken && (
//               <>
//                 <Route path="/add-firm" element={<AddFirm />} />
//                 <Route path="/add-product" element={<AddProduct />} />
//                 <Route path="/all-products" element={<AllProducts />} />
//               </>
//             )}

//             {/* 404 Page */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;





import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./vendorDashboard/components/NavBar";
import SideBar from "./vendorDashboard/components/SideBar";
import Footer from "./vendorDashboard/components/Footer";  // ⬅️ Import Footer

import LandingPage from "./vendorDashboard/pages/LandingPage";
import Welcome from "./vendorDashboard/pages/Welcome";
import Login from "./vendorDashboard/components/forms/Login";
import Register from "./vendorDashboard/components/forms/Register";
import AddFirm from "./vendorDashboard/components/forms/AddFirm";
import AddProduct from "./vendorDashboard/components/forms/AddProduct";
import AllProducts from "./vendorDashboard/components/AllProducts";
import NotFound from "./vendorDashboard/components/forms/NotFound";
import "./APP.css";
const App = () => {
  const loginToken = localStorage.getItem("loginToken");
  const firmName = localStorage.getItem("firmName");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Navbar */}
      <NavBar onToggleSidebar={setSidebarOpen} />

      <div className="main-section">
        {/* Sidebar */}
        <SideBar showFirmTitle={!firmName} isOpen={sidebarOpen} />

        {/* Main content area */}
        <div className="collectionSection">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={<Register showLoginHandler={() => (window.location.href = "/login")} />}
            />

            {/* Protected Routes */}
            {loginToken && (
              <>
                <Route path="/add-firm" element={<AddFirm />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/all-products" element={<AllProducts />} />
              </>
            )}

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>

      {/* Footer always visible */}
      <Footer />
    </div>
  );
};

export default App;




