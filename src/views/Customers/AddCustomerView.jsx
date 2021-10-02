import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AddCustomerForm from '../../components/Customers/AddCustomerForm';
import AddSubForm from '../../components/Customers/AddSubForm';

const NewCustomerView = () => {
  const navigate = useNavigate();
  // Get the authentication token for API requests
  let AccessToken = sessionStorage.getItem('SecretToken');
  console.log('ACCESS TOKEN: ', AccessToken)

  // Defining the useStates
  const [customer, setCustomer] = useState({});
  const [sub, setSub] = useState(null);
  const [products, setProducts] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    setSub({
      ...sub,
    });

    setCustomer({
      ...customer,
    });
  }, [setSub, setCustomer]);

  console.log('Sub: ', sub);
  console.log('Products: ', products);
  console.log('Product Options: ', productOptions);
  console.log('Selected Products: ', selectedProducts);

  // Getting the products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/products`, {
          headers: {
            Authorization: AccessToken,
          },
        });
        const responseOptions = response.data.map((product) => ({ value: product.id, label: product.name }));
        setProducts(response.data);
        setProductOptions(responseOptions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [setProducts, setProductOptions]);

  // CUSTOMER FORM
  // Update first name
  const setFirstName = (event) => {
    setCustomer({
      ...customer,
      first_name: event.target.value,
    });
  };

  // Update last name
  const setLastName = (event) => {
    setCustomer({
      ...customer,
      last_name: event.target.value,
    });
  };

  // Update email
  const setEmail = (event) => {
    setCustomer({
      ...customer,
      email: event.target.value,
    });
  };

  // SUBSCRIPTION FORM
  // Update start date
  const setStartDate = (event) => {
    setSub({
      ...sub,
      start_date: event.target.value,
    });
  };

  // Update end date
  const setEndDate = (event) => {
    setSub({
      ...sub,
      end_date: event.target.value,
    });
  };

  // Update items
  const handleSelectedOptions = async (event) => {
    const theSelectedProducts = products.filter((product) => event.some((item) => item.value === product.id));

    // Displaying cost to user
    const selectedPrices = theSelectedProducts.map((product) => parseFloat(product.price));
    const sum = selectedPrices.reduce((result, number) => result + number, 0);
    setCost(sum);

    // Setting selected products for PUT
    const theSelectedProductsFormatted = theSelectedProducts.map((product) => product.id);
    setSelectedProducts(theSelectedProductsFormatted);
    setSub({
      ...sub,
      items: theSelectedProductsFormatted,
    });
  };

  const isValid = () => {
    if (!customer) {
      alert('There is no customer to submit.');
      return false;
    } else if (!sub) {
      alert('This customer needs a subscription.');
      return false;
    } else if (!sub.start_date) {
      alert('Start date is required.');
      return false;
    } else if (!sub.end_date) {
      alert('End date is required.');
      return false;
    } else if (!sub.items) {
      alert('Subscription items are required.');
      return false;
    } else {
      return true;
    }
  };

  // Defining onSubmit
  const onSubmit = async (event) => {
    event.preventDefault();

    if (!isValid()) {
      return;
    }

    try {
      // Add Customer
      const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/customers/`, customer, {
        headers: {
          Authorization: AccessToken,
        },
      });

      const enrichedSub = {
        ...sub,
        customer: response.data.id,
      };

      // Add Subscription
      const response2 = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/subscriptions/`, enrichedSub, {
        headers: {
          Authorization: AccessToken,
        },
      });
      setSub(response2.data);

      // Alert successful submission
      alert(`${customer.first_name} has been added successfully.`);

      // Navigate to new customer
      navigate(`../${response.data.id}`);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div>
      <div>
        <div className="container bg-light shadow-sm rounded-3 border border-grey">
          <form onSubmit={onSubmit}>
            <h6 className="mt-4">Add Customer</h6>
            <br />
            <AddCustomerForm
              customer={customer}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setEmail={setEmail}
            />
            {sub && (
              <AddSubForm
                productOptions={productOptions}
                sub={sub}
                cost={cost}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                onChange={handleSelectedOptions}
              />
            )}

            <div className="d-flex justify-content-center mt-2">
              <button type="submit" className="btn btn-success mx-2 mt-2">
                Add Customer
              </button>
            </div>
          </form>
          <br />
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default NewCustomerView;
