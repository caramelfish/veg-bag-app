import React, { useEffect, useState } from 'react';

const DateFilter = ({ previousDates, handleSelectedDates }) => {
  return (
    <div className="card">
      <div className="container m-2 mb-4">
        <div className="form-outline mb-3">
          <label htmlFor="dateTimeSelect" className="form-label mb-0">
            <b>Filter by Week</b>
            <p>
              <small>
                <em>Select any date that falls within the week you want to view.</em>
              </small>
            </p>
          </label>
          <input
            type="date"
            className="form-control mt-0"
            placeholder={previousDates.date.split('T')[0]}
            id="dateTimeSelect"
            onChange={handleSelectedDates}
          />
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
