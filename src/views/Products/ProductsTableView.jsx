import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Table from '../../components/Products/Table';

const ProductsView = () => {
  const [products, setProducts] = useState(null);
  console.log('Products setstate: ', products);

  // Get the authentication token for API requests
  const AccessToken = sessionStorage.getItem('SecretToken');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/products/`, {
        headers: {
          Authorization: AccessToken,
        },
      });

      setProducts(response.data);
      console.log('Products Data: ', response.data);
    };

    fetchProducts();
  }, [setProducts]);

  return (
    <div className="bg-light shadow-sm rounded-3 border border-grey">
      <div className="d-flex justify-content-end">
        <Link to="add">
          <button type="submit" className="btn btn-success mb-3 mt-3 m-5">
            Add new product
          </button>
        </Link>
      </div>
      <div>{products && <Table products={products} />}</div>
    </div>
  );
};

export default ProductsView;
