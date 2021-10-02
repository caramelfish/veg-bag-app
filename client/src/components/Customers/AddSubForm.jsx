import React from 'react';
import Select from 'react-select';

const AddSubForm = ({ sub, cost, productOptions, setStartDate, setEndDate, onChange }) => {
  return (
    <div>
      <h6 className="mt-4">Add Subscription</h6>
      <form>
        {/* Start Date */}
        <div className="mb-3 mt-4">
          <label htmlFor="inputStartDate" className="form-label">
            Start Date
          </label>
          <input type="date" className="form-control" id="inputStartDate" onChange={setStartDate} />
        </div>

        {/* End Date */}
        <div className="mb-3">
          <label htmlFor="inputEndDate" className="form-label">
            End Date
          </label>
          <input type="date" className="form-control" id="inputEndDate" onChange={setEndDate} />
        </div>

        {/* Products Dropdown */}
        <label htmlFor="inputItems" className="form-label">
          Select Items
        </label>
        <div className="mb-3 border border-1 border-grey rounded-3 bg-white mb-3">
          <Select options={productOptions} onChange={onChange} isMulti />
        </div>

        {/* Cost */}
        <fieldset disabled="disabled">
          <div className="mb-3">
            <label htmlFor="inputCost" className="form-label">
              Cost
            </label>
            <input type="number" className="form-control" id="inputCost" value={cost} readOnly />
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AddSubForm;
