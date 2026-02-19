// import React, { useState } from "react";
// import NavBar from "./NavBar";
// import SideBar from "./SideBar";
// import App from "../../App";

// const Layout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="layout">
//       <NavBar onToggleSidebar={setSidebarOpen} />
//       <div className="layoutContent">
//         <SideBar isOpen={sidebarOpen} showFirmTitle={true} />
//         <main className="mainContent">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default Layout;


import React, { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";   // import Footer

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      {/* Navbar */}
      <NavBar onToggleSidebar={setSidebarOpen} />

      <div className="layoutContent">
        {/* Sidebar */}
        <SideBar isOpen={sidebarOpen} showFirmTitle={true} />

        {/* Main Content */}
        <main className="mainContent">{children}</main>
      </div>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default Layout;




