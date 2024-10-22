import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { Search, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import './Tools.css';

const PlagiarismChecker: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<{ percentage: number; matches: string[] } | null>(null);
  const [activeSection, setActiveSection] = useState('প্লাগিয়ারিজম চেকার');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheck = async () => {
    setIsLoading(true);
    try {
      // এখানে একটি API কল সিমুলেট করা হচ্ছে
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // এখানে একটি সরল প্লাগিয়ারিজম চেক লজিক ব্যবহার করা হচ্ছে
      const words = inputText.toLowerCase().split(' ');
      const uniqueWords = new Set(words);
      const plagiarismPercentage = 100 - (uniqueWords.size / words.length) * 100;
      
      setResult({
        percentage: Math.round(plagiarismPercentage),
        matches: ['সূত্র 1', 'সূত্র 2', 'সূত্র 3']
      });
    } catch (error) {
      console.error('প্লাগিয়ারিজম চেক করার সময় ত্রুটি:', error);
      setResult(null);
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
      <div className="tool-content plagiarism-checker">
        <h1><Search size={24} className="tool-icon" /> প্লাগিয়ারিজম চেকার</h1>
        <div className="input-container">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="আপনার টেক্সট এখানে পেস্ট করুন..."
          />
          <button onClick={handleCheck} disabled={isLoading || inputText.trim().length === 0} className="check-button">
            {isLoading ? <><Loader size={16} className="spin" /> চেক করা হচ্ছে...</> : 'চেক করুন'}
          </button>
        </div>
        {result && (
          <div className="result-container">
            <h3>ফলাফল:</h3>
            <div className={`plagiarism-percentage ${result.percentage > 20 ? 'high' : 'low'}`}>
              {result.percentage > 20 ? <AlertCircle size={24} /> : <CheckCircle size={24} />}
              <span>প্লাগিয়ারিজম শতকরা: {result.percentage}%</span>
            </div>
            <div className="matches">
              <h4>মিল পাওয়া গেছে:</h4>
              <ul>
                {result.matches.map((match, index) => (
                  <li key={index}>{match}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlagiarismChecker;
