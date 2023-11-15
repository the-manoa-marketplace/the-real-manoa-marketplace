import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StuffItem = ({ stuff }) => (
  <tr>
    <td>{stuff.listingTitle}</td>
    <td>{stuff.price}</td>
    <td>{stuff.owner}</td>
    <td>{stuff.condition}</td>
    <td>{stuff.type}</td>

    <td>
      <Link to={`/edit/${stuff._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
StuffItem.propTypes = {
  stuff: PropTypes.shape({
    listingTitle: PropTypes.string,
    price: PropTypes.number,
    condition: PropTypes.string,
    owner: PropTypes.string,
    type: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default StuffItem;
