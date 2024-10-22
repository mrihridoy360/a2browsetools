import React from 'react';
import { Home, User, Clock, CreditCard, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../firebase/auth';
import './Sidebar.css';

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'হোম', icon: Home, path: '/dashboard' },
    { name: 'প্রোফাইল', icon: User, path: '/dashboard' },
    { name: 'ইতিহাস', icon: Clock, path: '/dashboard' },
    { name: 'বিলিং', icon: CreditCard, path: '/dashboard' },
    { name: 'সেটিংস', icon: Settings, path: '/dashboard' },
    { name: 'লগআউট', icon: LogOut, path: '/auth' },
  ];

  const handleNavigation = async (item: { name: string; path: string }) => {
    if (item.name === 'লগআউট') {
      const { success, error } = await logoutUser();
      if (success) {
        navigate('/auth');
      } else {
        console.error('লগআউট ত্রুটি:', error);
      }
    } else {
      onNavigate(item.name);
      navigate(item.path);
    }
  };

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={`sidebar-item ${activeSection === item.name ? 'active' : ''}`}
            onClick={() => handleNavigation(item)}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
