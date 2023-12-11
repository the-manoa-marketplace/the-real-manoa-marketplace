import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Image, Button, Modal, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Header component
const Header = () => (
    <div className="text-light text-center mb-4">
        <h5>Click on your profile to enlarge the contents</h5>
    </div>
);

const ProfileContentCard = ({ profile, onCardClick }) => (
    <Card className="bg-light p-4 text-center" onClick={onCardClick}>
        <Card.Img src={profile.image} width={100} className="rounded-circle mb-3" />
        <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
        <Card.Subtitle className="text-muted">{profile.address}</Card.Subtitle>
        <Card.Text>{profile.description}</Card.Text>
    </Card>
);

ProfileContentCard.propTypes = {
    profile: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        address: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
        _id: PropTypes.string,
    }).isRequired,
    onCardClick: PropTypes.func.isRequired,
};

const Profile = ({ profile }) => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleCardClick = () => {
        // Open the modal when the card is clicked
        handleShow();
    };

    return (
        <Container className="profile-container d-flex align-items-center justify-content-center flex-column" style={{ minHeight: '100vh', backgroundImage: `url(${profile.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {showModal && (
                // Modal is open
                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Body className="text-center bg-light p-5">
                        <Image src={profile.image} width={200} className="mb-3 rounded-circle" />
                        <h2>{profile.firstName} {profile.lastName}</h2>
                        <p className="text-muted">{profile.address}</p>
                        <p>{profile.description}</p>
                        <Link to={`/editpfp/${profile._id}`}>
                            <Button variant="primary">Edit Profile</Button>
                        </Link>
                        <Button variant="secondary" onClick={handleClose} className="ml-2">
                            Close
                        </Button>
                    </Modal.Body>
                </Modal>
            )}

            {/* Header component */}
            <Header />

            {/* Display the card-like component with a solid background color */}
            <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <ProfileContentCard profile={profile} onCardClick={handleCardClick} />
            </div>
        </Container>
    );
};

Profile.propTypes = {
    profile: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        address: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
        backgroundImage: PropTypes.string,
        _id: PropTypes.string,
    }).isRequired,
};

export default Profile;
