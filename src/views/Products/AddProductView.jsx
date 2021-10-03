import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import AddProductForm from '../../components/Products/AddProductForm';

const NewProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get the authentication token for API requests
  const AccessToken = sessionStorage.getItem('SecretToken');

  // Defining the useStates
  const [product, setProduct] = useState();

  // Set product name
  const setName = (event) => {
    event.preventDefault();
    setProduct({
      ...product,
      name: event.target.value,
    });
  };

  // Set product contents
  const setContents = (event) => {
    event.preventDefault();
    setProduct({
      ...product,
      contents: event.target.value,
    });
  };

  // Set product size
  const setSize = (event) => {
    event.preventDefault();
    setProduct({
      ...product,
      size: event.target.value,
    });
  };

  // Set product price
  const setPrice = (event) => {
    event.preventDefault();
    setProduct({
      ...product,
      price: event.target.value,
    });
  };

  // Define check valid
  const isValid = () => {
    if (!product) {
      alert('There is no product to submit.');
      return false;
    } else if (!product.name) {
      alert('Product name is required.');
      return false;
    } else if (!product.price) {
      alert('Product cost is required.');
      return false;
    } else if (!product.contents || !product.size) {
      const confirmSubmit = window.confirm(
        'You are submitting a new product although some fields remain empty. Press cancel to fill these fields, or press OK to continue.'
      );
      if (confirmSubmit == true) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  // Define onSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid()) {
      return;
    }

    console.log('Product being submitted: ', product);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/products/`, product, {
        headers: {
          Authorization: AccessToken,
        },
      });
      alert(`${product.name} has been created.`);
      navigate(`../`);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div>
      <div>
        <div className="container bg-light shadow-sm rounded-3 border border-grey">
          <form onSubmit={handleSubmit}>
            <h6 className="mt-4">Add Product</h6>
            <br />
            <AddProductForm setName={setName} setSize={setSize} setContents={setContents} setPrice={setPrice} />
            <div className="d-flex justify-content-center mt-2">
              <button type="submit" className="btn btn-success mx-2 mt-2">
                Add Product
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

export default NewProductView;
