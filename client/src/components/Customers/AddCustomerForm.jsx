import React from 'react';

const Form = ({ customer, setFirstName, setLastName, setEmail }) => {
  return (
    <form>
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
    </form>
  );
};

export default Form;
