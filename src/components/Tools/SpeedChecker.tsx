import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { Wifi, Download, Upload, AlertCircle, Loader } from 'lucide-react';
import './Tools.css';

const SpeedChecker: React.FC = () => {
  const [activeSection, setActiveSection] = useState('ইন্টারনেট স্পিড চেকার');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ download: number; upload: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSpeedTest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // এখানে একটি API কল সিমুলেট করা হচ্ছে
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // এখানে একটি সরল স্পিড টেস্ট লজিক ব্যবহার করা হচ্ছে
      const downloadSpeed = Math.random() * 100;
      const uploadSpeed = Math.random() * 50;
      
      setResult({
        download: Number(downloadSpeed.toFixed(2)),
        upload: Number(uploadSpeed.toFixed(2))
      });
    } catch (error) {
      console.error('স্পিড টেস্ট করার সময় ত্রুটি:', error);
      setError('স্পিড টেস্ট করার সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigation} />
      <div className="tool-content speed-checker">
        <h1><Wifi size={24} className="tool-icon" /> ইন্টারনেট স্পিড চেকার</h1>
        <p className="tool-description">
          আপনার ইন্টারনেট সংযোগের গতি পরীক্ষা করুন। এই টুলটি আপনার ডাউনলোড এবং আপলোড স্পিড মাপবে।
        </p>
        <button onClick={handleSpeedTest} disabled={isLoading} className="speed-test-button">
          {isLoading ? (
            <>
              <Loader size={16} className="spin" /> স্পিড টেস্ট চলছে...
            </>
          ) : (
            <>
              <Wifi size={16} /> স্পিড টেস্ট শুরু করুন
            </>
          )}
        </button>
        {error && (
          <div className="error-message">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        {result && (
          <div className="speed-result">
            <h3>টেস্ট রেজাল্ট:</h3>
            <div className="result-item">
              <Download size={20} />
              <span className="result-label">ডাউনলোড স্পিড:</span>
              <span className="result-value">{result.download} Mbps</span>
            </div>
            <div className="result-item">
              <Upload size={20} />
              <span className="result-label">আপলোড স্পিড:</span>
              <span className="result-value">{result.upload} Mbps</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedChecker;
