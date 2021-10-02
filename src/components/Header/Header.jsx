import React from 'react';

const Header = ({ onSignOut }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-warning">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navitems'">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="#navitems">
          <div className="navbar-nav ms-auto mb-2 mb-lg-0 ml-auto">
            <button className="btn" aria-current="page" href="/account">
              Account
            </button>
            <button className="btn" href="#" onClick={onSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
