import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { FileText, RefreshCw, Copy, AlertCircle } from 'lucide-react';
import './Tools.css';

const ArticleRewriter: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [activeSection, setActiveSection] = useState('আর্টিকেল রিরাইটার');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRewrite = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // এখানে একটি API কল সিমুলেট করা হচ্ছে
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // এখানে একটি সরল রিরাইট লজিক ব্যবহার করা হচ্ছে
      const rewrittenText = inputText.split(' ').map(word => {
        if (word.length > 3) {
          return word.split('').reverse().join('');
        }
        return word;
      }).join(' ');
      
      setOutputText(rewrittenText);
    } catch (error) {
      console.error('রিরাইট করার সময় ত্রুটি:', error);
      setError('দুঃখিত, একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigation} />
      <div className="tool-content article-rewriter">
        <h1><FileText size={24} className="tool-icon" /> আর্টিকেল রিরাইটার</h1>
        <div className="input-container">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="আপনার আর্টিকেল এখানে লিখুন..."
          />
          <button onClick={handleRewrite} disabled={isLoading || inputText.trim().length === 0} className="rewrite-button">
            {isLoading ? <><RefreshCw size={16} className="spin" /> প্রক্রিয়াকরণ হচ্ছে...</> : 'রিরাইট করুন'}
          </button>
        </div>
        {error && (
          <div className="error-message">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        {outputText && (
          <div className="output-container">
            <h3>রিরাইট করা আর্টিকেল:</h3>
            <div className="output-text">
              <p>{outputText}</p>
            </div>
            <button onClick={handleCopy} className="copy-button">
              <Copy size={16} /> কপি করুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleRewriter;
