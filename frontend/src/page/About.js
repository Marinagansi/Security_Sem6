import React from 'react'
import '../style/about.css'
import about from '../assest/aboutus.jpg'


const About = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2 className="about-heading">Discover Our Story</h2>
        <p className="about-description">
          Welcome to Marina jewellery Shop, where the allure of exquisite jewelry meets the artistry of craftsmanship. Our journey began with a passion for creating timeless pieces that celebrate life's moments.
        </p>
        <p className="about-description">
          Our team of skilled artisans pour their heart and expertise into every piece, ensuring that each gemstone sparkles with brilliance and every design resonates with beauty. We believe that jewelry is not just an accessory but a reflection of your unique style and cherished memories.
        </p>
        <p className="about-description">
          From our ethically sourced materials to our dedication to quality, we invite you to explore our curated collection that includes engagement rings, statement necklaces, elegant bracelets, and more. Join us in celebrating the joy of self-expression and the elegance of craftsmanship.
        </p>
      </div>
      <div className="about-image">
        <img
          src={about} // Add the path to your about image
          alt="About Us"
        />
      </div>
    </section>
  );
};

export default About;
