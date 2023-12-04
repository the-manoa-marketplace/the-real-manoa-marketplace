import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const MeetTheTeam = () => {
  return (
    <Container id="landing-page" fluid className="py-3">
      <h1 className="pb-3 text-center display-2">Meet The Team!</h1>
      <Row className="d-flex align-items-center justify-content-center">
        <Col xs={11} xl={9} className="d-flex align-items-center justify-content-center">
          <p
            className="w-100 py-3 px-3"
            style={{
              wordSpacing: '2px',
              lineHeight: '1.8',
              letterSpacing: '0.4px',
              fontWeight: 'bold', // Make sure this is camelCase and the value is a string
            }}
          >
              Hey there! We're a bunch of Computer Science students over at the University of Hawaii
              at Manoa. When we're not buried in homework assignments, we love hanging out and doing all sorts of fun
              things together. One of our favorite hobbies? Drinking our pain away... Just kidding! Creating awesome
              websites for awesome people, just like you! If you dig what we've built, you'll probably dig us too.
              We're just a laid-back crew that enjoys blending tech skills with a cool, collaborative vibe.
              Looking forward to connecting with you!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default MeetTheTeam;
