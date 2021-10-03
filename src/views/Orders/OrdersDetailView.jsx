import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

import Card from '../../components/Orders/Card';
import Form from '../../components/Orders/Form';

const DetailView = () => {
  // Getting the order ID from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Get the authentication token for API requests
  const AccessToken = sessionStorage.getItem('SecretToken');

  // Defining setStates
  const [order, setOrder] = useState();
  const [originalOrder, setOriginalOrder] = useState();
  // Getting all the possible products
  const [extras, setExtras] = useState([]);
  // Setting those products in a format which is usable by the Select component
  const [extraOptions, setExtraOptions] = useState([]);
  // Setting the extras which have been selected
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [cost, setCost] = useState(null);

  console.log('Order: ', order);
  console.log('Original Order: ', originalOrder);
  console.log('Extras: ', extras);
  console.log('Extra Options: ', extraOptions);
  console.log('Selected Extras: ', selectedExtras);
  console.log('Cost: ', cost);

  // Getting the order data
  useEffect(() => {
    const fetchOrder = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/orders/${id}`, {
        headers: {
          Authorization: AccessToken,
        },
      });

      // Order read-view
      setOriginalOrder(response.data);
      setCost(response.data.cost);
      setOrder(response.data);
    };

    fetchOrder();
  }, [setOriginalOrder, setCost, setOrder]);

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
        setExtras(response.data);
        setExtraOptions(responseOptions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [setExtras, setExtraOptions]);

  // Defining what happens when user selects options from extras dropdown
  const handleSelectedExtras = async (event) => {
    const theSelectedProducts = extras.filter((product) => event.some((item) => item.value === product.id));

    const selectedPrices = theSelectedProducts.map((product) => parseFloat(product.price));
    const sum = selectedPrices.reduce((result, number) => result + number, 0);
    setCost(sum);

    // Updating selected products to PUT appropriate format
    const theSelectedProductsFormatted = theSelectedProducts.map((product) => product.id);
    console.log('Selected Extras Formatted:', theSelectedProductsFormatted);

    setSelectedExtras(theSelectedProductsFormatted);
    setOrder({
      ...order,
      extras: theSelectedProductsFormatted,
    });
  };

  // Defining onSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Order being submitted: ', order);
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_ROOT}/orders/${order.id}/`, order, {
        headers: {
          Authorization: AccessToken,
        },
      });
      setOriginalOrder(response.data);
      console.log('Response data after PUT request', response.data);
      alert('Order has been amended.');
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  // Defining onDelete
  const handleDelete = async (event) => {
    event.preventDefault();

    const confirmDelete = window.confirm(
      'You are about to delete this order. Press OK to delete the order. NOTE: If you re-generate orders at any point, the order will be re-created based on the subscription. If you plan on regenerating orders and do not want the order to be re-created, you will need to mark the customer as on holiday.'
    );

    try {
      if (confirmDelete == true) {
        await axios.delete(`${process.env.REACT_APP_API_ROOT}/orders/${id}/`, {
          headers: {
            Authorization: AccessToken,
          },
        });
        alert('Order deleted.');
        navigate('../', { replace: true });
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong. The order has not been deleted.');
    }
  };

  // Render this
  return (
    <div>
      <div className="row">
        <div className="col">{originalOrder && <Card order={originalOrder} />}</div>
      </div>
      <div className="row">
        <div className="col">
          <div className="container bg-light shadow-sm rounded-3 border border-grey">
            <br />
            <h6 className="mb-4">Edit Order</h6>
            <Form
              order={order}
              cost={cost}
              extras={extraOptions}
              onChange={handleSelectedExtras}
              onSubmit={handleSubmit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
