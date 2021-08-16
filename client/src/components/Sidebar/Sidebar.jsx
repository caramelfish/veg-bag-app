import React from 'react';
import './Sidebar.css';
import logo from '../../imgs/green-isle-growers.png';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark custom_nav">
      <div className="container-fluid container_custom" style={{ top: 0, position: 'fixed' }}>
        <div className="navbar-text me-auto">
          <a href="#" className="navbar-brand ">
            <img src={logo} alt="Green Isle Growers Logo" width="175" />
          </a>
          <hr />
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/customers" className="nav-link">
                Customers
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
