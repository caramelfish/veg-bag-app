import React from 'react';

const Table = (props) => {
  console.log('Props', props);
  console.log('Props Customers', props.customers);

  const rows = props.customers.map((customer) => {
    return (
      <tr>
        <th scope="row">{customer.id}</th>
        <td>{customer.first_name}</td>
        <td>{customer.last_name}</td>
        <td>{customer.email}</td>
        <td>{customer.balance}</td>
      </tr>
    );
  });
  return (
    <table className="table">
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
