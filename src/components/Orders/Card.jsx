import React from 'react';

const Card = ({ order }) => {
  console.log('Card order prop: ', order);

  const returnItems = () => {
    const theItems = order.subscription_details.items_details.map((item) => <li>{item.name}</li>);

    return (
      <p className="card-text mb-2">
        <b>Items:</b> {theItems}
      </p>
    );
  };

  const returnExtras = () => {
    const theExtras = order.extras_details.map((extra) => <li>{extra.name}</li>);

    return (
      <p className="card-text mb-2">
        <b>Extras:</b> {theExtras}
      </p>
    );
  };

  return (
    <div>
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">
            {/* Date with removed timezone data */}
            <b>{order.id}</b> {'-'} {order.date.split('T')[0]}
          </h5>
          <p className="card-text mb-2">
            <b>Week:</b> {order.week_start.split('T')[0]} to {order.week_end.split('T')[0]}
          </p>
          <p className="card-text mb-2">
            <b>Customer:</b> {order.subscription_details.customer_details.first_name}{' '}
            {order.subscription_details.customer_details.last_name}
          </p>
          {returnItems()}
          {returnExtras()}
          <p className="card-text mb-2">
            <b>Cost:</b> £{order.cost}
          </p>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Card;
