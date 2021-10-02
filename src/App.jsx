import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

import './App.css';

import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Dashboard from './views/Dashboard/DashboardView';
import Orders from './views/Orders/OrdersLayout';
import Customers from './views/Customers/CustomersLayout';
import Finances from './views/Finances/FinancesLayout';
import Products from './views/Products/ProductsLayout';
import Account from './views/User Management/AccountView';
import Login from './views/User Management/LoginView';
import Register from './views/User Management/RegisterView';

function App() {
  document.title = 'Veg Bag App';

  const navigate = useNavigate();

  // Get the authentication token for API requests
  const AccessToken = sessionStorage.getItem('SecretToken');

  // Checking if user is logged in / authorised
  const checkAuth = () => {
    const tokenCheck = sessionStorage.getItem('SecretToken');
    if (tokenCheck === null) {
      return false;
    } else {
      return true;
    }
  };

  const onSignOut = async (event) => {
    event.preventDefault();

    const confirmSignOut = window.confirm('You will be signed out.');

    try {
      if (confirmSignOut == true) {
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/rest-auth/logout/`, null, {
            headers: {
              Authorization: AccessToken,
            },
          });
        } catch (error) {
          if (error.response) {
            console.log('ERROR.RESPONSE');
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            alert(JSON.stringify(error.response.data, null, 4));
          } else if (error.request) {
            console.log('ERROR.REQUEST');
            // The request was made but no response was received
            console.log(error.request);
            alert('Something went wrong. Please try again. If the problem persists, contact the administrator.');
          } else {
            console.log('ERROR.MESSAGE');
            alert('Something went wrong, please try again. If the problem persists, contact the administrator.');
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        }
        alert('You have been signed out.');
        sessionStorage.removeItem('SecretToken');
        navigate('../', { replace: true });
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  // If checkAuth is true, user is logged in, so display the App
  if (checkAuth()) {
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
              <Route path="products/*" element={<Products />} />
              <Route path="customers/*" element={<Customers />} />
              <Route path="orders/*" element={<Orders />} />
              <Route path="finances/*" element={<Finances />} />
              <Route path="account/" element={<Account />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  } else {
    // If checkAuth is false, user is not logged in, so display the login page
    return (
      <div className="container">
        <h1>You must be logged in to access this site.</h1>
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    );
  }
}

export default App;
