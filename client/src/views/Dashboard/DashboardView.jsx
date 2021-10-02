import React from 'react';

const DashboardView = () => {
  return (
    <div>
      <h1 className="text-warning" style={{ paddingBottom: '20px', paddingTop: '5px' }}>
        Dashboard
      </h1>
      <p>
        If you cannot see any data on this website you do not have the appropriate permissions to access this site.
      </p>
      <p>Contact the site administrator if this is incorrect.</p>
    </div>
  );
};

export default DashboardView;
