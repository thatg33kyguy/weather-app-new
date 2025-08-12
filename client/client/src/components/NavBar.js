import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Daily Summaries
          </NavLink>
        </li>
        <li>
          <NavLink to="/historical-trends" className={({ isActive }) => (isActive ? 'active' : '')}>
            Historical Trends
          </NavLink>
        </li>
        <li>
          <NavLink to="/set-thresholds" className={({ isActive }) => (isActive ? 'active' : '')}>
            Set Thresholds
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
