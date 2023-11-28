import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const ContactUs = () => {
  return (
    <Container id="landing-page" fluid className="py-3">
      <h1 className="pb-3 text-center display-2">Welcome to UHMarketplace!</h1>
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
            UHMarketplace provides a centralized space that brings together students from various
            corners of the campus, facilitating the seamless buying and selling of a wide range of
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            items. Whether you're looking to declutter your living space by parting with everyday
            essentials or showcasing unique knickknacks that might pique the interest of your peers,
            UHMarketplace stands as the optimal platform for fostering connections and transactions
            within the student community. Join the marketplace to explore the diverse array of offerings,
            connect with fellow students, and make the most of this dynamic exchange platform
            tailored to meet your campus-wide trading needs.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
