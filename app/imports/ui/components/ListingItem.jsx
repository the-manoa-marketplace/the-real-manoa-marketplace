import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ListingItem = ({ listing }) => (
  <tr>
    <td>{listing.listingTitle}</td>
    <td>{listing.price}</td>
    <td>{listing.owner}</td>
    <td>{listing.description}</td>
    <td>{listing.condition}</td>
    <td>{listing.tags}</td>

    <td>
      <Link to={`/edit/${listing._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
ListingItem.propTypes = {
  listing: PropTypes.shape({
    listingTitle: PropTypes.string,
    price: PropTypes.number,
    condition: PropTypes.string,
    owner: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ListingItem;
