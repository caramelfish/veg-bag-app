import React from 'react';
import PropTypes from 'prop-types';

const Names = ({ people }) => (
  <h2>
    Whatever you want for now,{' '}
    {people.map((person) => (
      <span key={person}> {person} </span>
    ))}
  </h2>
);

Names.propTypes = {
  people: PropTypes.arrayOf(PropTypes.string),
};

export default Names;
