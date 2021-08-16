import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
// import ToDo from './components/ToDo/ToDo';
import './App.css';
import Header from './components/Header/Header';
import Customers from './views/Customers/Customers';
// import ToDo from './components/ToDo';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import Dashboard from './views/Dashboard/Dashboard';
import Orders from './views/Orders/Orders';

function App() {
  return (
    <Router>
      <div className="row" style={{ height: '100vh' }}>
        <div className="col navbar_col">
          <Sidebar />
        </div>
        <div className="col">
          <div className="row header_custom">
            <Header />
            <hr />
          </div>
          <div className="container-fluid">
            <div className="container-fluid bg-light rounded-3 border border-white">
              <div className="row">
                <Switch>
                  <Route path="/customers">
                    <Customers />
                  </Route>
                  <Route path="/orders">
                    <Orders />
                  </Route>
                  <Route path="/">
                    <Dashboard />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

// row - top bar (header)
// row then column - sidebar
// more columns in that row - page content
// row at bottom - footer

export default App;
