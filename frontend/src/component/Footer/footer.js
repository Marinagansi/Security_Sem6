import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import "./footer.css";

const footerQuickLinks = [
  {
    display: "Home",
    url: "#",
  },
  {
    display: "About US",
    url: "#about",
  },

  {
    display: "Career",
    url: "#event",
  },

  
];

const footerInfoLinks = [
  // {
  //   display: "Scholarship",
  //   url: "Scholarships",
  // },
  // {
  //   display: "Membership",
  //   url: "#",
  // },

  // {
  //   display: "Purchases Guide",
  //   url: "#",
  // },

  // {
  //   display: "Terms of Service",
  //   url: "#",
  // },
];

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="6" className="mb-4">
            <h2 className=" d-flex align-items-center gap-1header2 ">
              <i class="ri-pantone-line"></i> Learners.
            </h2>

            <div className="follows">
              {/* <p className="mb-0">Follow us on social media</p> */}
              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-facebook-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-instagram-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-linkedin-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-twitter-line"></i>
                </a>
              </span>
            </div>
          </Col>

          {/* <Col lg="3" md="6" className="mb-4">
            <h6 className="fheader">Explore</h6>
            <ListGroup className="link__list">
              {footerQuickLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link__item">
                  {" "}
                  <a href={item.url}>{item.display}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col> */}

          <Col lg="3" md="6" className="mb-4">
            <h6 className="fheader">Information</h6>
            <ListGroup className="link__list">
              {footerInfoLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link__item">
                  {" "}
                  <a href={item.url}>{item.display}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6">
            <h6 className="fheader">Get in Touch</h6>

            <p className="p">Address:Kathmandu </p>
            <p className="p"> Phone:  0123456789 </p>
            <p className="p">Email: educate@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;