import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({ orders }) => {
  const rows = orders.map((order) => {
    return (
      <tr>
        <th scope="row">
          <Link to={`${order.id}`}>{order.id}</Link>
        </th>
        <td>{order.date.split('T')[0]}</td>
        <td>
          <Link to={`../customers/${order.subscription_details.customer_details.id}`}>
            <p className="mb-1">
              <b>ID:</b> {order.subscription}
            </p>
          </Link>
          <p className="mb-1">
            <b>Customer:</b> {order.subscription_details.customer_details.first_name}{' '}
            {order.subscription_details.customer_details.last_name}
          </p>
          <p className="mb-1">
            <b>Items:</b> {order.subscription_details.items_details.map((item) => item.name).join(', ')}
          </p>
        </td>
        <td>{order.extras_details.map((extra) => extra.name).join(', ')}</td>
        <td>{order.cost}</td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Date</th>
          <th scope="col">Subscription</th>
          <th scope="col">Extras</th>
          <th scope="col">Cost</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;
