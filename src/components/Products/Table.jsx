/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

const Table = (props) => {
  console.log('table PROPS: ', props);
  console.log('table PRODUCTS: ', props.products);

  const rows = props.products.map((product) => {
    return (
      <tr>
        <th scope="row">{product.id}</th>
        <td>
          <Link to={`${product.id}`}>{product.name}</Link>
        </td>
        <td>{product.contents}</td>
        <td>{product.size}</td>
        <td>£{product.price}</td>
      </tr>
    );
  });

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Product</th>
          <th scope="col">Contents</th>
          <th scope="col">Size</th>
          <th scope="col">Cost</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;
