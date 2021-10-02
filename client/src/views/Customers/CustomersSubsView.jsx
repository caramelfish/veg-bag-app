import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '../../components/Subs/Table';

const Subs = () => {
  const [subs, setSubs] = useState([]);

  // Get the authentication token for API requests
  const AccessToken = sessionStorage.getItem('SecretToken');

  useEffect(() => {
    const fetchSubs = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/subscriptions`, {
        headers: {
          Authorization: AccessToken,
        },
      });

      setSubs(response.data);
    };

    fetchSubs();
  }, [setSubs]);

  return (
    <div>
      <h3>Subscriptions</h3>
      <br />
      <div className="bg-light shadow-sm rounded-3 border border-grey">
        <Table subs={subs} />
      </div>
    </div>
  );
};

export default Subs;
