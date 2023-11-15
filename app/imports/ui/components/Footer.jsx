import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center">

        {' '}
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        {' '}
        <br />
          <a href="http://ics-software-engineering.github.io/meteor-application-template-react">
              Contact Us
          </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
