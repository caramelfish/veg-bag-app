import React from 'react';

const Card = ({ customer, checkBalance }) => {
  const archivedCustomer = ({ customer }) => {
    if (customer.archived == true) {
      return <h4 className="card-title text-danger mb-3">Archived</h4>;
    }
  };

  return (
    <div>
      <div className="card shadow">
        <div className="card-body">
          {archivedCustomer({ customer })}
          <h5 className="card-title">
            {customer.first_name} {customer.last_name}
          </h5>
          <p className="card-text mb-2 mt-4">Email: {customer.email}</p>
          <p className="card-text" color={checkBalance}>
            Balance: {customer.balance}
          </p>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Card;
