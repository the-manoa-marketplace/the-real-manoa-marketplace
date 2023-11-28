import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
// eslint-disable-next-line react/prop-types
const Profile = ({ profile }) => (
    <Card className="h-100">
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <Card.Header>
        {/* eslint-disable-next-line react/prop-types */}
        <Image src={profile.image} width={75} />
        {/* eslint-disable-next-line react/jsx-pascal-case,react/prop-types */}
        <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
        {/* eslint-disable-next-line react/jsx-pascal-case,react/prop-types */}
        <Card.Subtitle>{profile.address}</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        {/* eslint-disable-next-line react/prop-types */}
        <Card.Text>{profile.description}</Card.Text>
      </Card.Body>
      {/* eslint-disable-next-line react/prop-types */}
      <Link to={`/edit/${profile._id}`}>Edit</Link>
    </Card>
);

// Require a document to be passed to this component.
Profile.propTypes = {
  stuff: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    // _id: PropTypes.string,
  }).isRequired,
};

export default Profile;
