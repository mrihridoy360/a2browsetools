import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Menu, X } from 'lucide-react';
import './Navbar.css';
import logo from '../../assets/logo.svg'; // লোগো ইমেজ আপলোড করুন

interface NavbarProps {
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="লোগো" className="logo-image" />
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={() => setIsMenuOpen(false)}>
              হোম
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={() => setIsMenuOpen(false)}>
              আমাদের সম্পর্কে
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links" onClick={() => setIsMenuOpen(false)}>
              যোগাযোগ
            </Link>
          </li>
          {user ? (
            <li className="nav-item">
              <Link to="/dashboard" className="nav-links dashboard-button" onClick={() => setIsMenuOpen(false)}>
                <LayoutDashboard size={20} className="button-icon" />
                <span className="button-text">ড্যাশবোর্ড</span>
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/auth" className="nav-links login-button" onClick={() => setIsMenuOpen(false)}>
                <span className="button-icon">🔐</span>
                <span className="button-text">লগইন/রেজিস্টার</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
