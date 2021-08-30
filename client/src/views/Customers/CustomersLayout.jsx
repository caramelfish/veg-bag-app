import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TableView from './CustomersTableView';
import ArchiveView from './CustomerArchiveView';
import DetailView from './CustomersDetailView';
import CustomerAddView from './CustomerAddView';
import HolidaysView from './CustomersHolidayView';
import Subs from './CustomersSubsView';

const Layout = () => {
  return (
    <div>
      <h1 className="text-warning" style={{ paddingBottom: '20px', paddingTop: '5px' }}>
        Manage Customers
      </h1>
      <div>
        <Routes>
          <Route path="" element={<TableView />} />
          <Route path="add" element={<CustomerAddView requestType="post" />} />
          <Route path=":id" element={<DetailView />} />
          <Route path="archive" element={<ArchiveView />} />
          <Route path="holidays" element={<HolidaysView />} />
          <Route path="subscriptions/*" element={<Subs />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
