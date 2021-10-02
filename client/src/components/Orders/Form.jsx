import React from 'react';
import Select from 'react-select';

const SubForm = ({ extras, onChange, cost, onSubmit, onDelete }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        {/* Extras Dropdown */}
        <label htmlFor="inputExtras" className="form-label">
          Select Extras
        </label>
        <div className="border border-1 border-grey rounded-3 bg-white mb-3">
          <Select options={extras} onChange={onChange} isMulti />
        </div>
        {/* End of Extras Dropdown */}

        <fieldset disabled="disabled">
          <div className="mb-3">
            <label htmlFor="inputCost" className="form-label">
              Cost
            </label>
            <input type="number" className="form-control" id="inputCost" value={cost} readOnly />
          </div>
        </fieldset>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success mx-2 mt-2">
            Edit Order
          </button>
          <button className="btn btn-danger mx-2 mt-2" onClick={onDelete}>
            Delete Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default SubForm;
