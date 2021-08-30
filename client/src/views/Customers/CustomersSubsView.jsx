import React, { useState, useEffect } from 'react';
import Table from '../../components/SubsTable/Table';
import axios from 'axios';

const Subs = () => {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const fetchSubs = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/subscriptions`);

      setSubs(response.data);
    };

    fetchSubs();
  }, [setSubs]);

  return (
    <div>
      <h3>Manage Subscriptions</h3>
      <br />
      <div className="bg-light shadow-sm rounded-3 border border-grey">
        <Table subs={subs} />
      </div>
    </div>
  );
};

export default Subs;
