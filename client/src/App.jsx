import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css';

import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Dashboard from './views/Dashboard/DashboardView';
import Orders from './views/Orders/OrdersLayout';
import Customers from './views/Customers/CustomersLayout';
import Finances from './views/Finances/FinancesLayout';
import Products from './views/Dashboard/ProductsView';
import Account from './views/Account/AccountView';

function App() {
  const navigate = useNavigate();

  const onSignOut = async (event) => {
    event.preventDefault();

    const confirmSignOut = window.confirm('You will be signed out.');

    try {
      if (confirmSignOut == true) {
        alert('You have been signed out.');
        navigate('../', { replace: true });
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="row" style={{ height: '100vh' }}>
      <div className="col nav_col bg-dark">
        <Sidebar />
      </div>

      <div className="col">
        <div className="row">
          <Header onSignOut={onSignOut} />
          <hr />
        </div>

        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="customers/*" element={<Customers />} />
            <Route path="orders/*" element={<Orders />} />
            <Route path="finances/*" element={<Finances />} />
            <Route path="account/" element={<Account />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
