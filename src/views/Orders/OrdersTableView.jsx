import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import Table from '../../components/Orders/Table';
import DateFilter from '../../components/Orders/DateFilter';
import { endOfWeek, startOfWeek } from 'date-fns';

const Orders = () => {
  const [orders, setOrders] = useState();
  const [filteredDate, setFilteredDate] = useState();
  console.log('ALL ORDERS: ', orders);
  console.log('FILTERED DATE: ', filteredDate);

  // Get the authentication token for API requests
  const AccessToken = sessionStorage.getItem('SecretToken');

  // Function which generates the orders
  const generateOrders = async (event) => {
    event.preventDefault();

    const confirmGeneration = window.confirm('This will (re)generate the orders for this week.');
    try {
      if (confirmGeneration == true) {
        const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/orders/generate_orders/`, null, {
          headers: {
            Authorization: AccessToken,
          },
        });
        alert('Orders have been generated for this week.');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert('There was an error.');
    }
  };

  // Gets all orders
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/orders`, {
        headers: {
          Authorization: AccessToken,
        },
      });
      setOrders(response.data);
    };

    fetchOrders();
  }, [setOrders]);

  // Set default date for filtering (current week)
  useEffect(() => {
    const today = new Date();
    const iso_today = today.toISOString();
    const start = startOfWeek(today, { weekStartsOn: 1 });
    const iso_start = start.toISOString();
    const end = endOfWeek(today, { weekStartsOn: 1 });
    const iso_end = end.toISOString();
    setFilteredDate({
      date: iso_today,
      start: iso_start,
      end: iso_end,
    });
  }, []);

  // Get selected dates
  const getSelectedDates = (event) => {
    event.preventDefault();
    const selectedDate = new Date(event.target.value);
    const iso_selectedDate = selectedDate.toISOString();
    const selectedStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const iso_selectedStart = selectedStart.toISOString();
    const selectedEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
    const iso_selectedEnd = selectedEnd.toISOString();
    setFilteredDate({
      date: iso_selectedDate,
      start: iso_selectedStart,
      end: iso_selectedEnd,
    });
  };

  // Filter by selected dates and return table with selected dates
  const filterOrders = () => {
    console.log('Orders for filtering: ', orders);
    const filtered = orders.filter((order) => order.week_end.split('T')[0] == filteredDate.end.split('T')[0]);
    console.log('filtered_ ', filtered);

    return <Table orders={filtered} />;
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center gap-4">
        <button className="btn btn-success align-items-center d-sm-inline-flex" onClick={generateOrders}>
          Generate Orders
        </button>
        {filteredDate && <DateFilter previousDates={filteredDate} handleSelectedDates={getSelectedDates} />}
      </div>
      <br />
      <div className="container-fluid">
        <div className="bg-light shadow-sm rounded-3 border border-grey">{orders && filterOrders()}</div>
      </div>
    </div>
  );
};

export default Orders;
