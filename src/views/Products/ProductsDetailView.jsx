import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import Card from '../../components/Products/Card';
import Form from '../../components/Products/EditProductForm';

const DetailView = () => {
  // Getting the customer ID from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Get the authentication token for API requests
  const AccessToken = sessionStorage.getItem('SecretToken');

  // Defining the useStates
  const [product, setProduct] = useState();
  const [originalProduct, setOriginalProduct] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/products/${id}`, {
        headers: {
          Authorization: AccessToken,
        },
      });

      setProduct(response.data);
      setOriginalProduct(response.data);
    };

    fetchProduct();
  }, [setProduct, setOriginalProduct]);

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

  // Defining onSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_ROOT}/products/${id}/`, product, {
        headers: {
          Authorization: AccessToken,
        },
      });
      setOriginalProduct(response.data);
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  // Defining onDelete
  const handleDelete = async (event) => {
    event.preventDefault();

    // Confirm delete popup
    const confirmDelete = window.confirm(
      `You are about to permanently delete ${product.name}. NOTE: Subscriptions with this product will also be altered.`
    );

    try {
      if (confirmDelete == true) {
        await axios.delete(`${process.env.REACT_APP_API_ROOT}/products/${id}/`, {
          headers: {
            Authorization: AccessToken,
          },
        });
        alert(`${product.first_name} has been deleted`);
        navigate('../', { replace: true });
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col">{originalProduct && <Card product={originalProduct} />}</div>
      </div>
      <div className="row">
        <div className="col">
          <div className="container bg-light shadow-sm rounded-3 border border-grey">
            <br />
            <h6>Edit Product</h6>
            <br />
            {product && (
              <Form
                product={product}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
                setName={setName}
                setContents={setContents}
                setPrice={setPrice}
                setSize={setSize}
              />
            )}

            <br />
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default DetailView;
