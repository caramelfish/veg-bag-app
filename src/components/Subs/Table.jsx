import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({ subs }) => {
  const rows = subs
    .sort((a, b) => b.active - a.active)
    .map((sub) => {
      const returnActive = () => {
        if (sub.active == true) {
          return 'Active';
        } else {
          return 'Inactive';
        }
      };

      return (
        <tr>
          <th scope="row">{sub.id}</th>
          <td>
            <Link to={`../${sub.customer}`}>
              {sub.customer_details.first_name} {sub.customer_details.last_name}
            </Link>
          </td>
          <td>{sub.items_details.map((item) => item.name).join(', ')}</td>
          <td>{sub.cost}</td>
          <td>{sub.start_date}</td>
          <td>{sub.end_date}</td>
          <td>{returnActive()}</td>
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
