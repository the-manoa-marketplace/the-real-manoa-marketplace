import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import UserProfile from '../components/Profile';
import { Profiles } from '../../api/Profile/Profiles';

/* Renders a table containing all the Profile documents. Use <StuffItem> to render each row. */
const UserPage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Profile documents
    const profileItems = Profiles.collection.find({}).fetch();
    return {
      contacts: profileItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col md={7}>
            <Col className="text-center">
              <h2>Your Profile</h2>
            </Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {profiles.map((profile, index) => (<Col key={index}><UserProfile profile={profile} /></Col>))}
            </Row>
          </Col>
        </Row>
      </Container>
  ) : <LoadingSpinner />);
};

export default UserPage;
