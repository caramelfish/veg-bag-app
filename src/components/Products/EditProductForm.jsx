import React from 'react';

const SubForm = ({ product, setName, setContents, setSize, setPrice, onSubmit, onDelete }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="inputName" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="inputName"
          placeholder={product.name}
          value={product.name}
          onChange={setName}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputContents" className="form-label">
          Contents
        </label>
        <textarea
          className="form-control"
          id="inputContents"
          placeholder={product.contents}
          value={product.contents}
          onChange={setContents}
        />
      </div>
      <div className="mb-3 form-group">
        <label htmlFor="inputSize" className="form-label">
          Size
        </label>
        <input
          type="text"
          className="form-control"
          id="inputSize"
          placeholder={product.size}
          value={product.size}
          onChange={setSize}
        />
      </div>
      <div className="mb-3 form-group">
        <label htmlFor="inputCost" className="form-label">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          id="inputCost"
          placeholder={product.price}
          value={product.price}
          onChange={setPrice}
        />
      </div>
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-success mx-2 mt-2">
          Edit Product
        </button>
        <button type="button" className="btn btn-danger mx-2 mt-2" onClick={onDelete}>
          Delete Product
        </button>
      </div>
    </form>
  );
};

export default SubForm;
