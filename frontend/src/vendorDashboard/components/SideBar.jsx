
import React from 'react';
import { Link } from 'react-router-dom';


const SideBar = ({ showFirmTitle, isOpen }) => {
  return (
    <div className={`sideBarSection ${isOpen ? 'open' : ''}`}>
      <ul>
        {showFirmTitle && <li><Link to="/add-firm">Add Firm</Link></li>}
        <li><Link to="/add-product">Add Product</Link></li>
        <li><Link to="/all-products">All Products</Link></li>
        <li><Link to="/welcome">User Details</Link></li>
      </ul>
    </div>
  );
};

export default SideBar;






