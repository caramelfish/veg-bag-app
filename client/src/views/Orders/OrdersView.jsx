import React, { useState, useEffect } from 'react';
import Table from '../../components/OrdersTable/Table';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/orders`);
      setOrders(response.data);
    };

    fetchOrders();
  }, [setOrders]);

  return (
    <div>
      <div className="bg-light shadow-sm rounded-3 border border-grey">
        <Table orders={orders} />
      </div>
    </div>
  );
};

export default Orders;
