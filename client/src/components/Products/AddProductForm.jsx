import React from 'react';

const Form = ({ setName, setContents, setSize, setPrice }) => {
  return (
    <form>
      <div className="mb-3 form-group">
        <label htmlFor="inputFirstName" className="form-label">
          Name
        </label>
        <input type="text" className="form-control" id="inputName" onChange={setName} />
      </div>
      <div className="mb-3 form-group">
        <label htmlFor="inputLastName" className="form-label">
          Contents
        </label>
        <textarea className="form-control" id="inputContents" onChange={setContents} />
      </div>
      <div className="mb-3 form-group">
        <label htmlFor="inputSize" className="form-label">
          Size
        </label>
        <input type="text" className="form-control" id="inputSize" onChange={setSize} />
      </div>
      <div className="mb-3 form-group">
        <label htmlFor="inputCost" className="form-label">
          Price
        </label>
        <input type="number" className="form-control" id="inputCost" onChange={setPrice} />
      </div>
    </form>
  );
};

export default Form;
