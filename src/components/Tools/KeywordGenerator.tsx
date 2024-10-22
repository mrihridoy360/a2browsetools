import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { FileText, Key, Loader } from 'lucide-react';
import './Tools.css';

const KeywordGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState('কীওয়ার্ড জেনারেটর');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const generateKeywords = () => {
    setIsLoading(true);
    // এখানে একটি সরল কীওয়ার্ড জেনারেশন লজিক ব্যবহার করা হচ্ছে
    const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 3);
    const wordFrequency: {[key: string]: number} = {};
    words.forEach(word => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
    const sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1]);
    setTimeout(() => {
      setKeywords(sortedWords.slice(0, 10).map(item => item[0]));
      setIsLoading(false);
    }, 1500);
  };

  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigation} />
      <div className="tool-content keyword-generator">
        <h1><Key size={24} className="tool-icon" /> কীওয়ার্ড জেনারেটর</h1>
        <div className="input-container">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="আপনার টেক্সট এখানে লিখুন..."
          />
          <button onClick={generateKeywords} disabled={isLoading || text.trim().length === 0} className="generate-button">
            {isLoading ? <><Loader size={16} className="spin" /> প্রক্রিয়াকরণ হচ্ছে...</> : 'কীওয়ার্ড তৈরি করুন'}
          </button>
        </div>
        {keywords.length > 0 && (
          <div className="result">
            <h3><FileText size={20} /> জেনারেট করা কীওয়ার্ডসমূহ:</h3>
            <div className="keywords">
              {keywords.map((keyword, index) => (
                <span key={index} className="keyword">{keyword}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeywordGenerator;
