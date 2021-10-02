import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TableView from './ProductsTableView';
import DetailView from './ProductsDetailView';
import AddProductView from './AddProductView';

const Layout = () => {
  return (
    <div>
      <h1 className="text-warning" style={{ paddingBottom: '20px', paddingTop: '5px' }}>
        Manage Products
      </h1>
      <div>
        <Routes>
          <Route path="" element={<TableView />} />
          <Route path="add" element={<AddProductView />} />
          <Route path=":id" element={<DetailView />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
