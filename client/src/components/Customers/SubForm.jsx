import React from 'react';
import Select from 'react-select';

const SubForm = ({ sub, setStartDate, onSubmit, setEndDate, products, onChange }) => {
  console.log('Sub FORM sub prop: ', sub);
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="inputStartDate" className="form-label">
          Start Date
        </label>
        <input
          type="date"
          className="form-control"
          id="inputStartDate"
          placeholder={sub.start_date}
          value={sub.start_date}
          onChange={setStartDate}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputEndDate" className="form-label">
          End Date
        </label>
        <input
          type="date"
          className="form-control"
          id="inputEndDate"
          placeholder={sub.end_date}
          value={sub.end_date}
          onChange={setEndDate}
        />
      </div>

      {/* Products Dropdown */}
      <label htmlFor="inputItems" className="form-label">
        Select Items
      </label>
      <div className="border border-1 border-grey rounded-3 bg-white mb-3">
        <Select options={products} onChange={onChange} isMulti />
      </div>
      {/* End of Products Dropdown */}

      <fieldset disabled="disabled">
        <div className="mb-3">
          <label htmlFor="inputCost" className="form-label">
            Cost
          </label>
          <input type="number" className="form-control" id="inputCost" value={sub.cost} readOnly />
        </div>
      </fieldset>
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-success mx-2 mt-2">
          Edit Subscription
        </button>
      </div>
    </form>
  );
};

export default SubForm;
