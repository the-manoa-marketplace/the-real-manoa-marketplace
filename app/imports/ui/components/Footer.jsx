import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'react-bootstrap-icons';

const Footer = () => (
  <footer className="bg-dark">
    <div className="d-flex justify-content-center align-items-center mt-4">
      <a href="https://twitter.com/i/flow/login?redirect_after_login=%2Fuhmanoa" className="nav-link">
        <Twitter size={30} className="mx-5" style={{ color: 'white' }} />
      </a>
      <span className="slash">/</span>
      <a href="https://www.facebook.com/uhmanoa?mibextid=kFxxJD" className="nav-link">
        <Facebook size={30} className="mx-5" style={{ color: 'white' }} />
      </a>
      <span className="slash">/</span>
      <a href="https://www.instagram.com/uhmanoanews/?igshid=OGQ5ZDc2ODk2ZA%3D%3D" className="nav-link">
        <Instagram size={30} className="mx-5" style={{ color: 'white' }} />
      </a>
      <span className="slash">/</span>
      <a href="https://www.youtube.com/@universityofhawaiiatmanoa-2732?si=GcBqK9quLwZY0xAk" className="nav-link">
        <Youtube size={30} className="mx-5" style={{ color: 'white' }} />
      </a>
      <span className="slash">/</span>
      <a href="https://www.linkedin.com/school/uhmanoa/" className="nav-link">
        <Linkedin size={30} className="mx-5" style={{ color: 'white' }} />
      </a>
    </div>
    <Container className="mt-auto">
      <Row className="mt-3 d-flex align-items-center">
        <Col className="d-flex flex-column">
          <nav>
            <NavLink to="/" className="nav-link mb-2 text-white">
              About Us
            </NavLink>
            <a href="https://myuh.hawaii.edu/" className="nav-link mb-2 text-white">
              MyUH
            </a>
            <NavLink to="/meettheteam" className="nav-link mb-2 text-white">
              Meet The Team
            </NavLink>
          </nav>
        </Col>
        <Col className="text-center d-flex flex-column align-items-center">
          <nav>
            <img src="/images/uhmainlogo.png" className="custom-img" alt="UHM main logo" />
          </nav>
        </Col>
        <Col className="text-right d-flex flex-column align-items-end">
          <nav>
            <NavLink to="/tos" className="nav-link mb-2 text-white">
              Terms of Service
            </NavLink>
            <NavLink to="/pp" className="nav-link mb-2 text-white">
              Privacy Policy
            </NavLink>
            <NavLink to="/contactus" className="nav-link mb-2 text-white">
              Contact Us
            </NavLink>
          </nav>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
