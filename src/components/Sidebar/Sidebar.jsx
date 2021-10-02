import React from 'react';
import './Sidebar.css';
import logo from '../../imgs/green-isle-growers.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <Link to="/" className="sidebar-navigation navbar-brand">
        <img src={logo} className="img-fluid text-center" alt="Green Isle Growers Logo" style={{ padding: '20px' }} />
      </Link>
      <hr />
      <ul className="sidebar-navigation">
        <li className="header">Home</li>
        <li>
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/products" className="nav-link">
            Products
          </Link>
        </li>
        <li className="header">Customers</li>
        <li>
          <Link to="customers" className="nav-link">
            Customers
          </Link>
        </li>
        <li>
          <Link to="customers/archive" className="nav-link">
            Archived Customers
          </Link>
        </li>
        <li>
          <Link to="customers/subscriptions" className="nav-link">
            Subscriptions
          </Link>
        </li>
        <li>
          <Link to="customers/holidays" className="nav-link">
            Customer Holidays
          </Link>
        </li>
        <li className="header">Orders</li>
        <li>
          <Link to="orders" className="nav-link">
            Orders
          </Link>
        </li>
        <li>
          <Link to="orders/packing" className="nav-link">
            Packing
          </Link>
        </li>
        <li className="header">Finances</li>
        <li>
          <Link to="finances" className="nav-link">
            Financial Overview
          </Link>
        </li>
        <li>
          <Link to="finances/transactions" className="nav-link">
            Transactions
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
