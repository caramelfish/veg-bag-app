import React from 'react';

const Card = ({ product }) => {
  return (
    <div>
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text mb-2 mt-4">Contents: {product.contents}</p>
          <p className="card-text mb-2 mt-4">Size: {product.size}</p>
          <p className="card-text mb-2 mt-4">Cost: £{product.price}</p>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Card;
