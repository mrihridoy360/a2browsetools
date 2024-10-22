import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import ToolCard from '../ToolCard/ToolCard';
import Profile from '../Profile/Profile';
import History from '../History/History';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('হোম');
  const navigate = useNavigate();

  const tools = [
    {
      title: 'আর্টিকেল রিরাইটার',
      description: 'আপনার আর্টিকেল পুনর্লিখন করুন এবং উন্নত করুন',
      icon: 'article' as const,
      path: '/tools/article-rewriter',
    },
    {
      title: 'প্লাগিয়ারিজম চেকার',
      description: 'আপনার লেখা অনন্য কিনা তা যাচাই করুন',
      icon: 'plagiarism' as const,
      path: '/tools/plagiarism-checker',
    },
    {
      title: 'ইন্টারনেট স্পিড চেকার',
      description: 'আপনার ইন্টারনেট সংযোগের গতি পরীক্ষা করুন',
      icon: 'speed' as const,
      path: '/tools/speed-checker',
    },
    {
      title: 'ওয়ার্ড কাউন্টার',
      description: 'আপনার টেক্সটের শব্দ ও অক্ষর সংখ্যা গণনা করুন',
      icon: 'word' as const,
      path: '/tools/word-counter',
    },
    {
      title: 'ট্যাগ জেনারেটর',
      description: 'আপনার কন্টেন্টের জন্য ট্যাগ তৈরি করুন',
      icon: 'tag' as const,
      path: '/tools/tag-generator',
    },
    {
      title: 'কীওয়ার্ড জেনারেটর',
      description: 'আপনার কন্টেন্টের জন্য কীওয়ার্ড তৈরি করুন',
      icon: 'keyword' as const,
      path: '/tools/keyword-generator',
    },
  ];

  const handleNavigation = (section: string) => {
    setActiveSection(section);
    // এখানে আপনি অতিরিক্ত নেভিগেশন লজিক যোগ করতে পারেন
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'হোম':
        return (
          <div className="dashboard-home">
            <h2>স্বাগতম ড্যাশবোর্ডে</h2>
            <h3 className="tools-heading">উপলব্ধ টুলস</h3>
            <div className="tools-grid">
              {tools.map((tool, index) => (
                <ToolCard
                  key={index}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  onClick={() => navigate(tool.path)}
                />
              ))}
            </div>
          </div>
        );
      case 'প্রোফাইল':
        return <Profile />;
      case 'ইতিহাস':
        return <History />;
      case 'বিলিং':
        return (
          <div className="dashboard-billing">
            <h2>বিলিং তথ্য</h2>
            {/* বিলিং বিষয়বস্তু এখানে যোগ করুন */}
          </div>
        );
      case 'সেটিংস':
        return (
          <div className="dashboard-settings">
            <h2>অ্যাকাউন্ট সেটিংস</h2>
            {/* সেটিংস বিষয়বস্তু এখানে যোগ করুন */}
          </div>
        );
      case 'লগআউট':
        return <h2>লগআউট করা হচ্ছে...</h2>;
      default:
        return <h2>নির্বাচিত বিভাগ: {activeSection}</h2>;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigation} />
      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
