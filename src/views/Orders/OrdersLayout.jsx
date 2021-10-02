import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import Orders from './OrdersTableView';
import DetailView from './OrdersDetailView';
import Packing from './PackingView';

const OrdersLayout = () => {
  return (
    <div>
      <h1 className="text-warning" style={{ paddingBottom: '20px', paddingTop: '5px' }}>
        Manage Orders
      </h1>
      <div>
        <Routes>
          <Route path="" element={<Orders />} />
          <Route path=":id" element={<DetailView />} />
          <Route path="packing" element={<Packing />} />
        </Routes>
      </div>
    </div>
  );
};

export default OrdersLayout;
