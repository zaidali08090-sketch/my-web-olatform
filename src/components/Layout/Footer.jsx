import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '20px', textAlign: 'center', background: '#f1f1f1' }}>
      <div>
        <h4>Contact Us</h4>
        <p>Email: info@example.com</p>
        <p>Phone: +1 234 567 890</p>
      </div>
      <div>
        <h4>Follow Us</h4>
        <p>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> | 
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </p>
      </div>
      <div>
        <p>&copy; 2026 My Web Platform. All rights reserved.</p>
        <p>My Web Platform is a web-based application providing incredible features and functionalities.</p>
      </div>
    </footer>
  );
};

export default Footer;