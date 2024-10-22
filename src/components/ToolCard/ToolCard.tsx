import React from 'react';
import { FileText, Search, Wifi, Type, Tag, Key } from 'lucide-react';
import './ToolCard.css';

interface ToolCardProps {
  title: string;
  description: string;
  icon: 'article' | 'plagiarism' | 'speed' | 'word' | 'tag' | 'keyword';
  onClick: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, onClick }) => {
  const getIcon = () => {
    switch (icon) {
      case 'article':
        return <FileText size={24} />;
      case 'plagiarism':
        return <Search size={24} />;
      case 'speed':
        return <Wifi size={24} />;
      case 'word':
        return <Type size={24} />;
      case 'tag':
        return <Tag size={24} />;
      case 'keyword':
        return <Key size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="tool-card" onClick={onClick}>
      <div className="tool-icon">{getIcon()}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ToolCard;
