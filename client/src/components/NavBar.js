import React from 'react';
import { Link } from 'react-router-dom';
//import './NavBar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Daily Summaries</Link></li>
        <li><Link to="/historical-trends" className={({ isActive }) => (isActive ? 'active' : '')}>Historical Trends</Link></li>
        <li><Link to="/set-thresholds" className={({ isActive }) => (isActive ? 'active' : '')}>Set Thresholds</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
