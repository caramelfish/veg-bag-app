import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({ subs }) => {
  const rows = subs.map((sub) => {
    console.log('Sub: ', sub);
    return (
      <tr>
        <th scope="row">{sub.id}</th>
        <td>
          <Link to={`${sub.customer.id}`}>{sub.customer}</Link>
        </td>
        <td>{sub.items.join(', ')}</td>
        <td>{sub.cost}</td>
        <td>{sub.start_date}</td>
        <td>{sub.end_date}</td>
        <td>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" checked />
          </div>
        </td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Customer</th>
          <th scope="col">Items</th>
          <th scope="col">Cost</th>
          <th scope="col">Start Date</th>
          <th scope="col">End Date</th>
          <th scope="col">Active</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;
