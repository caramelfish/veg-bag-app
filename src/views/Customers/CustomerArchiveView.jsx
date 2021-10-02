import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '../../components/Customers/Table';

const ArchiveView = () => {
  // Get the authentication token for API requests
  const AccessToken = sessionStorage.getItem('SecretToken');

  // Define states
  const [customers, setCustomers] = useState([]);
  const [archived, setArchive] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/customers`, {
        headers: {
          Authorization: AccessToken,
        },
      });

      setCustomers(response.data);
    };

    fetchCustomers();
  }, [setCustomers]);

  useEffect(() => {
    const archivedCustomers = customers.filter((customer) => customer.archived === true);

    setArchive(archivedCustomers);
  }, [customers, setArchive]);

  return (
    <div>
      <h3>Archived Customers</h3>
      <br />
      <div className="bg-light shadow-sm rounded-3 border border-grey">
        <Table customers={archived} />
      </div>
    </div>
  );
};

export default ArchiveView;
