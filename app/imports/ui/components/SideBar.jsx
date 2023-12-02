import React from 'react';
import PropTypes from 'prop-types';

const SideBar = ({ onFilterChange }) => {
  const filters = ['Apparel', 'Housewares', 'Vehicle', 'Electronics', 'Games', 'Other'];

  return (
    <div className="bg-transparent p-3">
      <h5>Filters</h5>
      <ul>
        {filters.map((filter, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => onFilterChange(filter)}
              className="btn btn-light bg-transparent mx-8 my-2"
            >
              {filter}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

SideBar.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default SideBar;
