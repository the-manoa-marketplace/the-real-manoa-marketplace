// ListingItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Carousel, Button, Card } from 'react-bootstrap';

const ListingItem = ({ listing, onReportClick }) => (
  <Card>
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
    <Card.Body>
      <Card.Title>{listing.listingTitle}</Card.Title>
      <Card.Text><strong>Price:</strong> ${listing.price}</Card.Text>
      <Button variant="outline-danger" onClick={() => onReportClick(listing)}>Report</Button>
    </Card.Body>
  </Card>
);

ListingItem.propTypes = {
  listing: PropTypes.shape({
    listingTitle: PropTypes.string,
    price: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }).isRequired,
  onReportClick: PropTypes.func.isRequired,
};

export default ListingItem;
