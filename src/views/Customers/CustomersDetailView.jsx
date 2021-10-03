import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

import CustomerCard from '../../components/Customers/CustomerCard';
import SubCard from '../../components/Customers/SubCard';
import Form from '../../components/Customers/EditCustomerForm';
import SubForm from '../../components/Customers/EditSubForm';

const DetailView = () => {
  // Getting the customer ID from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Get the authentication token for API requests
  const AccessToken = sessionStorage.getItem('SecretToken');

  // Defining the useStates
  const [customer, setCustomer] = useState({});
  const [originalCustomer, setOriginalCustomer] = useState({});
  // const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState(null);
  const [originalSub, setOriginalSub] = useState(null);
  const [products, setProducts] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cost, setCost] = useState(0);

  // Getting the customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/customers/${id}`, {
        headers: {
          Authorization: AccessToken,
        },
      });

      setCustomer(response.data);
      setOriginalCustomer(response.data);
    };

    fetchCustomer();
  }, [setCustomer, setOriginalCustomer]);

  // Getting all subscription data
  useEffect(() => {
    const fetchSub = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/subscriptions`, {
          headers: {
            Authorization: AccessToken,
          },
        });
        const thisSub = response.data.filter((sub) => sub.customer == id);
        console.log('thisSub', thisSub);

        // Calling the retrieve request to trigger the API function which automatically sets the sub as inactive if the end date is in the past
        const response2 = await axios.get(`${process.env.REACT_APP_API_ROOT}/subscriptions/${thisSub[0].id}`, {
          headers: {
            Authorization: AccessToken,
          },
        });

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
      await axios.put(
        `${process.env.REACT_APP_API_ROOT}/customers/${id}/`,
        { ...customer, archived: true },
        {
          headers: {
            Authorization: AccessToken,
          },
        }
      );

      alert(`${customer.first_name} ${customer.last_name} has been moved to the archive`);

      navigate('../archive');
    } catch (error) {
      console.log(error);
      alert('Something went wrong. Action has been aborted.');
    }
  };

  // Defining onSubmit
  const onCustomerSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_ROOT}/customers/${id}/`, customer, {
        headers: {
          Authorization: AccessToken,
        },
      });
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
        await axios.delete(`${process.env.REACT_APP_API_ROOT}/customers/${id}/`, {
          headers: {
            Authorization: AccessToken,
          },
        });
        alert(`${customer.first_name} has been deleted`);
        navigate('../archive', { replace: true });
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  // Defining markActive
  const markActive = async (event) => {
    event.preventDefault();
    // Confirmation
    const confirmChange = window.confirm(
      `You are about to make this subscription active again. This subscription will be able to generate orders again. NOTE: If the subscription end date is in the past, the subscription will automatically be marked as inactive again - update the subscription end date to resolve this.`
    );
    // If confirmed, try PUT request
    if (confirmChange == true) {
      try {
        const response = axios.patch(`${process.env.REACT_APP_API_ROOT}/api/subscriptions/${sub.id}/`, {
          active: true,
        });
        console.log('ACTIVE response', response.data);
        console.log('ACTIVE change confirmed');
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert('Something went wrong. Sub has not been marked as active.');
      }
    }
  };

  // Defining markInactive
  const markInactive = async (event) => {
    event.preventDefault();
    // Confirmation
    const confirmChange = window.confirm(
      `You are about to make this subscription inactive. Orders will no longer be created for this subscription unless it is set back to active.`
    );
    // If confirmed, try PUT request
    if (confirmChange == true) {
      try {
        const response = axios.patch(`${process.env.REACT_APP_API_ROOT}/api/subscriptions/${sub.id}/`, {
          active: false,
        });
        console.log('INACTIVE response', response.data);
        console.log('INACTIVE change confirmed');
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert('Something went wrong. Sub has not been marked as inactive.');
      }
    }
  };

  const onCustomerRestore = async (event) => {
    event.preventDefault();

    // Confirm restore popup
    const confirmRestore = window.confirm(`You are about to restore ${customer.first_name} ${customer.last_name}.`);

    try {
      if (confirmRestore == true) {
        await axios.put(
          `${process.env.REACT_APP_API_ROOT}/customers/${id}/`,
          { ...customer, archived: false },
          {
            headers: {
              Authorization: AccessToken,
            },
          }
        );
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
    const theSelectedProducts = products.filter((product) => event.some((item) => item.value === product.id));

    const selectedPrices = theSelectedProducts.map((product) => parseFloat(product.price));
    const sum = selectedPrices.reduce((result, number) => result + number, 0);
    setCost(sum);

    // Updating selected products to PUT
    const theSelectedProductsFormatted = theSelectedProducts.map((product) => product.id);
    setSelectedProducts(theSelectedProductsFormatted);
  };

  // Defining onSubmit
  const onSubSubmit = async (event) => {
    event.preventDefault();

    console.log('selected products before submission: ', selectedProducts);

    const formattedSub = () => {
      if (selectedProducts === undefined || selectedProducts.length == 0) {
        const { items_details, ...noItemsSub } = {
          ...sub,
        };
        return noItemsSub;
      } else {
        const { items_details, ...selectedItemsSub } = {
          ...sub,
          items: selectedProducts,
        };
        return selectedItemsSub;
      }
    };

    console.log('sub being submitted', formattedSub());

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_ROOT}/subscriptions/${sub.id}/`,
        formattedSub(),
        {
          headers: {
            Authorization: AccessToken,
          },
        }
      );
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
        <div className="col">
          {originalSub && <SubCard sub={originalSub} markActive={markActive} markInactive={markInactive} />}
        </div>
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
              onEdit={onCustomerSubmit}
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
                cost={cost}
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
