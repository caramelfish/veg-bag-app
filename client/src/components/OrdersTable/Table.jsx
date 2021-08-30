import React from 'react';

const Table = (props) => {
  const rows = props.orders.map((order) => {
    return (
      <tr>
        <th scope="row">{order.id}</th>
        <td>{order.date}</td>
        <td>{order.subscription}</td>
        <td>{order.extras}</td>
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
