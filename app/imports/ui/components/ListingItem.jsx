import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Carousel } from 'react-bootstrap';

const ListingItem = ({ listing }) => (
  <div>
    {listing.images && listing.images.length > 0 ? (
      <Carousel
        nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" style={{ filter: 'invert(1)' }} />}
        prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" style={{ filter: 'invert(1)' }} />}
      >
        {listing.images.map((url, index) => (
          <Carousel.Item key={index}>
            <Image src={url} style={{ width: '100%' }} thumbnail />
          </Carousel.Item>
        ))}
      </Carousel>
    ) : (
      <Image src="https://res.cloudinary.com/ddfut4ysa/image/upload/v1701156762/syn00xfrluhatga6s08e.jpg" thumbnail />
    )}
    <p><strong>Name:</strong> {listing.listingTitle}</p>
    <p><strong>Price:</strong> {listing.price}</p>
    <p><strong>Owner:</strong> {listing.owner}</p>
    <p><strong>Description:</strong> {listing.description}</p>
    <p><strong>Condition:</strong> {listing.condition}</p>
    <p><strong>Tags:</strong> {listing.tags}</p>
    <p><strong>Images:</strong></p>

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
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ListingItem;
