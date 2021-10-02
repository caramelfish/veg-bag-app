import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SubForm = ({ sub, setStartDate, onSubmit, setEndDate, products, onChange, cost }) => {
  console.log('Product options', products);
  const [defaultItems, setDefaultItems] = useState();
  console.log('Default Items: ', defaultItems);

  useEffect(() => {
    const getDefaultItems = () => {
      const filtered = [];
      sub.items_details.map((item) => {
        filtered.push(products.find((product) => product.label == item.name));
      });
      console.log('Filtered ', filtered);
      setDefaultItems(filtered);
    };
    getDefaultItems();
  }, [setDefaultItems]);

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
        {defaultItems && (
          <Select options={products} onChange={onChange} isMulti defaultValue={defaultItems.map((item) => item)} />
        )}
      </div>
      {/* End of Products Dropdown */}

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
          Edit Subscription
        </button>
      </div>
    </form>
  );
};

export default SubForm;
