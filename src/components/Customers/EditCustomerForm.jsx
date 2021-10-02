import React from 'react';

const Form = ({ customer, setFirstName, setLastName, setEmail, onSubmit, onArchive, onDelete, onRestore }) => {
  const archiveButton = ({ customer, onArchive, onRestore }) => {
    if (customer.archived == false) {
      return (
        <button type="button" className="btn btn-warning mx-2 mt-2" onClick={onArchive}>
          Archive Customer
        </button>
      );
    } else {
      return (
        <button className="btn btn-warning mx-2 mt-2" onClick={onRestore}>
          Restore Customer
        </button>
      );
    }
  };

  const deleteButton = ({ customer, onDelete }) => {
    if (customer.archived == true) {
      return (
        <button type="button" className="btn btn-danger mx-2 mt-2" onClick={onDelete}>
          Delete
        </button>
      );
    }
  };

  const addOrEditButton = ({ customer }) => {
    if ('id' in customer) {
      return (
        <button type="submit" className="btn btn-success mx-2 mt-2">
          Edit Customer
        </button>
      );
    } else {
      return (
        <button type="submit" className="btn btn-success mx-2 mt-2">
          Add Customer
        </button>
      );
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="inputFirstName" className="form-label">
          First Name
        </label>
        <input
          type="text"
          className="form-control"
          id="inputFirstName"
          placeholder={customer.first_name}
          value={customer.first_name}
          onChange={setFirstName}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputLastName" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          className="form-control"
          id="inputLastName"
          placeholder={customer.last_name}
          value={customer.last_name}
          onChange={setLastName}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputEmail" className="form-label">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          id="inputEmail"
          value={customer.email}
          onChange={setEmail}
          placeholder={customer.email}
        />
      </div>

      <div className="d-flex justify-content-center">
        {addOrEditButton({ customer })}
        {archiveButton({ customer, onArchive, onRestore })}
        {deleteButton({ customer, onDelete })}
      </div>
    </form>
  );
};

export default Form;
