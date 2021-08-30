/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

const Table = (props) => {
  const rows = props.customers.map((customer) => {
    return (
      <tr>
        <th scope="row">{customer.id}</th>
        <td>
          <Link to={`/${customer.id}`}>{customer.first_name}</Link>
        </td>
        <td>{customer.last_name}</td>
        <td>{customer.email}</td>
        <td>{customer.balance}</td>
      </tr>
    );
  });

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">Balance</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;
