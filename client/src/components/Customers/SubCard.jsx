import React from 'react';

const Card = ({ sub }) => {
  console.log('Sub CARD sub prop: ', sub);

  const isActive = () => {
    if (sub.active == true) {
      return (
        <p className="card-title text-success">
          <b>ACTIVE</b>
        </p>
      );
    } else {
      return (
        <p className="card-title text-warning">
          <b>INACTIVE</b>
        </p>
      );
    }
  };

  const returnItems = () => {
    const theItems = sub.items.map((item) => (
      <li>
        {item.name}: £{item.price}
      </li>
    ));

    return <p className="card-text mb-3">Items: {theItems}</p>;
  };

  return (
    <div>
      <div className="card shadow">
        <div className="card-body">
          {isActive()}
          <h5 className="card-title">Subscription (ID: {sub.id})</h5>
          <h6 className="card-text mb-3">
            {sub.start_date} to {sub.end_date}
          </h6>
          {returnItems()}
          <p className="card-text mb-1">Cost: {sub.cost}</p>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Card;
