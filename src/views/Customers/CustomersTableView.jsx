import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Table from '../../components/Customers/Table';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [nonArchived, setNonArchived] = useState([]);

  // Get the authentication token for API requests
  const AccessToken = sessionStorage.getItem('SecretToken');

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/customers`, {
        headers: {
          Authorization: AccessToken,
        },
      });

      setCustomers(response.data);
    };

    fetchCustomers();
  }, [setCustomers]);

  useEffect(() => {
    const nonArchivedCustomers = customers.filter((customer) => customer.archived === false);

    setNonArchived(nonArchivedCustomers);
  }, [customers, setNonArchived]);

  return (
    <div className="bg-light shadow-sm rounded-3 border border-grey">
      <div className="d-flex justify-content-end">
        <Link to="add">
          <button type="submit" className="btn btn-success mb-3 mt-3 m-5">
            Add new customer
          </button>
        </Link>
      </div>
      <div>
        <Table customers={nonArchived} />
      </div>
    </div>
  );
};

export default Customers;
