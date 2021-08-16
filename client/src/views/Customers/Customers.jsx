import React, { useEffect, useState } from 'react';
import Table from '../../components/CustomerTable/Table';
import axios from 'axios';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      console.log(process.env);
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/customers`);

      setCustomers(response.data);
    };

    fetchCustomers();
  }, [setCustomers]);

  console.log('Customers', customers);
  return (
    <div>
      <h1>Customers</h1>
      <Table customers={customers} />
    </div>
  );
};

export default Customers;
