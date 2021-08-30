import React from 'react';
import { Routes, Route } from 'react-router';

import Transactions from './TransactionsView';

const FinancesLayout = () => {
  return (
    <div>
      <h1 className="text-warning" style={{ paddingBottom: '20px', paddingTop: '5px' }}>
        Manage Finances
      </h1>
      <div>
        <Routes>
          <Route path="transactions" element={<Transactions />} />
        </Routes>
      </div>
    </div>
  );
};

export default FinancesLayout;
