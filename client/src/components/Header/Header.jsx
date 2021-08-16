import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light navbar_custom sticky-top">
      <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div />
        <div className="navbar-nav me-auto mb-2 mb-lg-0 ml-auto">
          <a className="nav-item nav-link" aria-current="page" href="#">
            Account
          </a>
          <a className="nav-item nav-link" href="#">
            Settings
          </a>
          <a className="nav-item nav-link" href="#">
            Sign Out
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
