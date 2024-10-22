import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, Wifi, Type, Tag, Key } from 'lucide-react';
import './Home.css';
import heroImage from '../../assets/ai-hero-section.png'; // এই লাইনটি যোগ করুন

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: FileText, title: 'আর্টিকেল রিরাইটার', description: 'AI-পাওয়ার্ড টুল যা আপনার লেখাকে নতুন রূপ দেয়' },
    { icon: Search, title: 'প্লাগিয়ারিজম চেকার', description: 'নিশ্চিত করুন আপনার কন্টেন্ট ১০০% অরিজিনাল' },
    { icon: Wifi, title: 'ইন্টারনেট স্পিড চেকার', description: 'আপনার ইন্টারনেট সংযোগের গতি যাচাই করুন' },
    { icon: Type, title: 'ওয়ার্ড কাউন্টার', description: 'আপনার লেখার শব্দ ও অক্ষর সংখ্যা গণনা করুন' },
    { icon: Tag, title: 'ট্যাগ জেনারেটর', description: 'আপনার কন্টেন্টের জন্য সেরা ট্যাগ তৈরি করুন' },
    { icon: Key, title: 'কীওয়ার্ড জেনারেটর', description: 'SEO-ফ্রেন্ডলি কীওয়ার্ড খুঁজে বের করুন' },
  ];

  return (
    <div className="home">
      <div className={`hero ${isVisible ? 'fade-in' : ''}`}>
        <div className="hero-content">
          <h1>আপনার লেখার শক্তি বাড়ান</h1>
          <p>আমাদের উন্নত টুলস ব্যবহার করে আপনার লেখাকে নতুন উচ্চতায় নিয়ে যান</p>
          <Link to="/auth" className="btn btn-primary">বিনামূল্যে শুরু করুন</Link>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="লেখা উন্নয়ন টুলস" /> {/* এই লাইনটি পরিবর্তন করুন */}
        </div>
      </div>
      
      <div className="features">
        <h2 className="section-title">আমাদের প্রধান বৈশিষ্ট্যসমূহ</h2>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <feature.icon size={48} className="feature-icon" />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="cta-section">
        <h2>আজই শুরু করুন</h2>
        <p>আপনার লেখা উন্নত করার জন্য আমাদের টুলস ব্যবহার করুন</p>
        <Link to="/auth" className="btn btn-secondary">নিবন্ধন করুন</Link>
      </div>
    </div>
  );
};

export default Home;
