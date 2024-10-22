import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { Tag, X, Copy, Loader, Search, Trash2 } from 'lucide-react';
import './Tools.css';

const TagGenerator: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [generatedTags, setGeneratedTags] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState('ট্যাগ জেনারেটর');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (keyword) {
      generateTags();
    }
  }, [keyword]);

  const generateTags = () => {
    setIsLoading(true);
    const tags = generateRealisticTags(keyword);
    setGeneratedTags(tags);
    setIsLoading(false);
  };

  const generateRealisticTags = (keyword: string): string[] => {
    const words = keyword.toLowerCase().split(/\s+/);
    const tags = new Set<string>();

    // মূল কীওয়ার্ড যোগ করুন
    tags.add(keyword.toLowerCase());

    // প্রতিটি শব্দের জন্য সম্ভাব্য ট্যাগ তৈরি করুন
    words.forEach(word => {
      if (word.length > 3) {
        tags.add(word);
        tags.add(`${word}s`); // বহুবচন
        tags.add(`${word}ing`); // ক্রিয়া রূপ
        tags.add(`${word}ed`); // অতীত রূপ
        tags.add(`best ${word}`);
        tags.add(`top ${word}`);
        tags.add(`${word} tips`);
        tags.add(`${word} ideas`);
        tags.add(`${word} guide`);
        tags.add(`${word} tutorial`);
        tags.add(`${word} examples`);
        tags.add(`${word} techniques`);
        tags.add(`${word} strategies`);
        tags.add(`${word} hacks`);
        tags.add(`${word} tricks`);
      }
    });

    // দুটি শব্দের সংযোজন
    for (let i = 0; i < words.length - 1; i++) {
      tags.add(`${words[i]} ${words[i+1]}`);
      tags.add(`${words[i]} ${words[i+1]} tips`);
      tags.add(`${words[i]} ${words[i+1]} guide`);
    }

    // সম্পর্কিত শব্দ যোগ করুন
    const relatedWords = ['how to', 'why', 'what is', 'benefits of', 'types of', 'ways to', 'importance of', 'best practices for'];
    relatedWords.forEach(relatedWord => {
      tags.add(`${relatedWord} ${keyword}`);
    });

    // বিশেষণ যোগ করুন
    const adjectives = ['easy', 'simple', 'quick', 'effective', 'powerful', 'essential', 'ultimate', 'comprehensive'];
    adjectives.forEach(adj => {
      tags.add(`${adj} ${keyword}`);
    });

    // প্রশ্ন-ভিত্তিক ট্যাগ
    tags.add(`how to ${keyword}`);
    tags.add(`why ${keyword} is important`);
    tags.add(`when to use ${keyword}`);
    tags.add(`where to find ${keyword}`);

    // বছর যোগ করুন
    const currentYear = new Date().getFullYear();
    tags.add(`${keyword} ${currentYear}`);
    tags.add(`${keyword} trends ${currentYear}`);

    return Array.from(tags).slice(0, 50); // সর্বোচ্চ 50টি ট্যাগ রিটার্ন করুন
  };

  const handleRemoveTag = (tag: string) => {
    setGeneratedTags(generatedTags.filter(t => t !== tag));
  };

  const handleCopyTags = () => {
    navigator.clipboard.writeText(generatedTags.join(', '));
  };

  const handleClearTags = () => {
    setGeneratedTags([]);
    setKeyword('');
  };

  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigation} />
      <div className="tool-content tag-generator">
        <h1><Tag size={24} className="tool-icon" /> ট্যাগ জেনারেটর</h1>
        <div className="input-container">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="কীওয়ার্ড লিখুন..."
              className="tag-input"
            />
          </div>
        </div>
        {isLoading ? (
          <div className="loading">
            <Loader size={24} className="spin" /> লোড হচ্ছে...
          </div>
        ) : (
          <>
            <div className="generated-tags">
              {generatedTags.map((tag, index) => (
                <div key={index} className="tag-item">
                  <span className="tag-text">{tag}</span>
                  <button className="remove-tag" onClick={() => handleRemoveTag(tag)}>
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
            {generatedTags.length > 0 && (
              <div className="button-group">
                <button onClick={handleCopyTags} className="action-button copy-button">
                  <Copy size={16} /> কপি ট্যাগস
                </button>
                <button onClick={handleClearTags} className="action-button clear-button">
                  <Trash2 size={16} /> ট্যাগ পরিষ্কার করুন
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TagGenerator;
