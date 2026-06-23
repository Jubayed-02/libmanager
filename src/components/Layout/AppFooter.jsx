import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";

function AppFooter() {
  return (
    <footer className="bg-white border-top mt-auto py-4">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <p className="text-muted mb-0">
              © {new Date().getFullYear()} LibManager. All rights reserved.
            </p>
          </Col>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <Link to="/" className="text-muted text-decoration-none me-3">
              Privacy
            </Link>
            <Link to="/" className="text-muted text-decoration-none me-3">
              Terms
            </Link>
            <Link to="/" className="text-muted text-decoration-none">
              Contact
            </Link>
          </Col>
          <Col md={4} className="text-center text-md-end">
            <a href="#" className="text-muted me-2">
              <BsGithub />
            </a>
            <a href="#" className="text-muted me-2">
              <BsTwitter />
            </a>
            <a href="#" className="text-muted">
              <BsLinkedin />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default AppFooter;
