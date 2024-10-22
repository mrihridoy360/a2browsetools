import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} আপনার কোম্পানির নাম। সর্বস্বত্ব সংরক্ষিত।</p>
      </div>
    </footer>
  );
};

export default Footer;
