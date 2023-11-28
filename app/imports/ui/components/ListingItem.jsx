import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListingItem = ({ listing }) => (
  <div>
    <p><strong>Name:</strong> {listing.listingTitle}</p>
    <p><strong>Price:</strong> {listing.price}</p>
    <p><strong>Owner:</strong> {listing.owner}</p>
    <p><strong>Description:</strong> {listing.description}</p>
    <p><strong>Condition:</strong> {listing.condition}</p>
    <p><strong>Tags:</strong> {listing.tags}</p>

    <Link to={`/edit/${listing._id}`}>Edit</Link>
  </div>
);

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
