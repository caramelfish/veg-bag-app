import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

import CustomerCard from '../../components/Customers/CustomerCard';
import SubCard from '../../components/Customers/SubCard';
import Form from '../../components/Customers/CustomerForm';
import SubForm from '../../components/Customers/SubForm';
import { EventNote } from '@material-ui/icons';

const DetailView = () => {
  // Getting the customer ID from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Defining the useStates
  const [customer, setCustomer] = useState({});
  const [originalCustomer, setOriginalCustomer] = useState({});
  // const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState(null);
  const [originalSub, setOriginalSub] = useState(null);
  const [products, setProducts] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  console.log('Sub: ', sub);
  console.log('Original Sub: ', originalSub);
  console.log('Products: ', products);
  console.log('Product Options: ', productOptions);
  console.log('Selected Products: ', selectedProducts);

  // Getting the customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/customers/${id}`);

      setCustomer(response.data);
      setOriginalCustomer(response.data);
    };

    fetchCustomer();
  }, [setCustomer, setOriginalCustomer]);

  // Getting all subscription data
  useEffect(() => {
    const fetchSub = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/subscriptions`);

        const response2 = await axios.get(`${process.env.REACT_APP_API_ROOT}/subscriptions/1`);

        console.log('RESPONSE 2: ', response2.data);

        const thisSub = response.data.filter((sub) => sub.customer == id);

        setSub(thisSub[0]);
        setOriginalSub(thisSub[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSub();
  }, [setSub, setOriginalSub]);

  // Getting the products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/products`);

        const productOptions = response.data.map((product) => ({ value: product.id, label: product.name }));

        setProducts(response.data);
        setProductOptions(productOptions);
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

  // Highlight customer balance if in credit
  const checkBalance = () => {
    if (customer.balance <= 0) {
      return 'danger';
    }
    return 'primary';
  };

  // Defining onArchive
  const onCustomerArchive = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_ROOT}/api/customers/${id}/`, { ...customer, archived: true });

      alert(`${customer.first_name} ${customer.last_name} has been moved to the archive`);

      navigate('../');
    } catch (error) {
      console.log(error);
      alert('Something went wrong. Action has been aborted.');
    }
  };

  // Defining onSubmit
  const onCustomerSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_ROOT}/api/customers/${id}/`, customer);
      setOriginalCustomer(response.data);
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  // Defining onDelete
  const onCustomerDelete = async (event) => {
    event.preventDefault();

    // Confirm delete popup
    const confirmDelete = window.confirm(
      `You are about to permanently delete ${customer.first_name} ${customer.last_name}`
    );

    try {
      if (confirmDelete == true) {
        await axios.delete(`${process.env.REACT_APP_API_ROOT}/api/customers/${id}/`);
        alert(`${customer.first_name} has been deleted`);
        navigate('../', { replace: true });
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  const onCustomerRestore = async (event) => {
    event.preventDefault();

    // Confirm restore popup
    const confirmRestore = window.confirm(`You are about to restore ${customer.first_name} ${customer.last_name}.`);

    try {
      if (confirmRestore == true) {
        await axios.put(`${process.env.REACT_APP_API_ROOT}/api/customers/${id}/`, { ...customer, archived: false });
        alert(`${customer.first_name} has been restored`);
        navigate('../');
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong. Action aborted.');
    }
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
    console.log('onChange event: SELECTED', event);

    const theProducts = products.filter((product) => event.some((item) => item.label === product.name));
    setSelectedProducts(theProducts);
  };

  // Defining onSubmit
  const onSubSubmit = async (event) => {
    event.preventDefault();

    const enrichedSub = {
      ...sub,
      items: selectedProducts,
    };

    console.log('Submitting sub: ', enrichedSub);

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_ROOT}/api/subscriptions/${sub.id}/`, enrichedSub);
      setOriginalSub(response.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <CustomerCard customer={originalCustomer} checkBalance={checkBalance} />
        </div>
        <div className="col">{originalSub && <SubCard sub={originalSub} />}</div>
      </div>
      <div className="row">
        <div className="col">
          <div className="container bg-light shadow-sm rounded-3 border border-grey">
            <br />
            <h6>Edit Customer</h6>
            <br />
            <Form
              customer={customer}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setEmail={setEmail}
              onSubmit={onCustomerSubmit}
              onArchive={onCustomerArchive}
              onDelete={onCustomerDelete}
              onRestore={onCustomerRestore}
            />
            <br />
          </div>
          <br />
          <div className="container bg-light shadow-sm rounded-3 border border-grey">
            <br />
            <h6>Edit Subscription</h6>
            <br />
            {sub && products && (
              <SubForm
                sub={sub}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                products={productOptions}
                onChange={handleSelectedOptions}
                onSubmit={onSubSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
