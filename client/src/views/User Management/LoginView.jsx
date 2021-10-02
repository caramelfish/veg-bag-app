import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const LoginView = () => {
  const navigate = useNavigate();

  // Get the authentication token for API requests
  const AccessToken = sessionStorage.getItem('SecretToken');

  const [account, setAccount] = useState();

  // Set email
  const setEmail = (event) => {
    event.preventDefault();
    setAccount({
      ...account,
      email: event.target.value,
    });
  };

  // Set username
  const setUser = (event) => {
    event.preventDefault();
    setAccount({
      ...account,
      username: event.target.value,
    });
  };

  // Set password
  const setPass = (event) => {
    event.preventDefault();
    setAccount({
      ...account,
      password: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log('ACCOUNT LOGGING IN: ', account);
      const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/rest-auth/login/`, account, {
        headers: {
          Authorization: AccessToken,
        },
      });
      if (response.data.key) {
        alert('User logged in successfully.');
        const token = response.data.key;
        const tokenString = `Token ${token}`;
        sessionStorage.setItem('SecretToken', tokenString);
        navigate('../', { replace: true });
      }
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
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 offset-lg-4">
          <div className="login-form bg-light mt-4 p-4">
            <form onSubmit={handleLogin} className="row g-3">
              <h4 className="text-warning">Welcome Back</h4>
              <div className="col-12">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email Address"
                  onChange={setEmail}
                />
              </div>
              <div className="col-12">
                <label>Username</label>
                <input type="text" name="username" className="form-control" placeholder="Username" onChange={setUser} />
              </div>
              <div className="col-12">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={setPass}
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-success float-end">
                  Login
                </button>
              </div>
            </form>
            <hr className="mt-4" />
            <div className="col-12">
              <p className="text-center mb-0">Don&apos;t have an account yet?</p>
              <p className="text-center">
                <Link to="register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
