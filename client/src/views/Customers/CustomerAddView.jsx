import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AddForm from '../../components/Customers/CustomerForm';

const AddCustomerView = () => {
  const navigate = useNavigate();

  // Getting the customer data
  const [customer, setCustomer] = useState({ balance: '-6.00' });

  // Set first name
  const setFirstName = (event) => {
    setCustomer({
      ...customer,
      first_name: event.target.value,
    });
  };

  // Set last name
  const setLastName = (event) => {
    setCustomer({
      ...customer,
      last_name: event.target.value,
    });
  };

  // Set email
  const setEmail = (event) => {
    setCustomer({
      ...customer,
      email: event.target.value,
    });
  };

  const isValid = () => {
    if (customer.first_name == '') {
      alert('First Name Required');
      return false;
    } else if (customer.last_name == '') {
      alert('Last Name Required');
      return false;
    } else if (customer.email == '') {
      alert('Email Required');
      return false;
    } else if (customer.balance == '') {
      alert('Balance Required');
      return false;
    }
    return true;
  };

  // Defining onSubmit
  const onSubmit = async (event) => {
    event.preventDefault();

    if (!isValid()) {
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/customers/`, customer);
      navigate('../', { replace: true });
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  return (
    <div>
      <div>
        <div className="m-4">
          <h6>Add Customer</h6>
          <br />
          <AddForm
            customer={customer}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCustomerView;
