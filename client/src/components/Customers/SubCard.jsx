import React from 'react';

const Card = ({ sub, markActive, markInactive }) => {
  const isActiveTitle = () => {
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

  const isActiveButton = () => {
    if (sub.active == true) {
      return (
        <button className="btn btn-secondary btn-sm" onClick={markInactive}>
          Mark Inactive
        </button>
      );
    } else {
      return (
        <button className="btn btn-success btn-sm" onClick={markActive}>
          Mark Active
        </button>
      );
    }
  };

  const returnItems = () => {
    const theItems = sub.items_details.map((item) => (
      <li>
        {item.name}: £{item.price}
      </li>
    ));

    return (
      <p className="card-text mb-3">
        <b>Items:</b> {theItems}
      </p>
    );
  };

  return (
    <div>
      <div className="card shadow">
        <div className="card-body">
          {isActiveTitle()}
          <h5 className="card-title">Subscription (ID: {sub.id})</h5>
          <h6 className="card-text mb-3">
            {sub.start_date} to {sub.end_date}
          </h6>
          {returnItems()}
          <p className="card-text mb-1">
            <b>Cost:</b> £{sub.cost}
          </p>
          <p className="d-flex justify-content-center mb-1 mt-3">{isActiveButton()}</p>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Card;
