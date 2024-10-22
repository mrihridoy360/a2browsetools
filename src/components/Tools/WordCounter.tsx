import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { FileText, Clock, Type, Hash, Book, Trash2, Copy, Target } from 'lucide-react';
import './Tools.css';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [activeSection, setActiveSection] = useState('ওয়ার্ড কাউন্টার');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [uniqueWords, setUniqueWords] = useState(0);
  const [longestWord, setLongestWord] = useState('');
  const [keywordDensity, setKeywordDensity] = useState<{[key: string]: number}>({});
  const navigate = useNavigate();

  useEffect(() => {
    countStats(text);
  }, [text]);

  const countStats = (text: string) => {
    const words = text.trim().split(/\s+/).filter(word => word !== '');
    const sentences = text.split(/[।!?]+/).filter(sentence => sentence.trim() !== '');
    const paragraphs = text.split('\n').filter(para => para.trim() !== '');
    const uniqueWordsSet = new Set(words.map(word => word.toLowerCase()));
    const longest = words.reduce((a, b) => a.length > b.length ? a : b, '');

    setWordCount(words.length);
    setCharCount(text.length);
    setSentenceCount(sentences.length);
    setParagraphCount(paragraphs.length);
    setReadingTime(Math.ceil(words.length / 200));
    setUniqueWords(uniqueWordsSet.size);
    setLongestWord(longest);

    // কীওয়ার্ড ঘনত্ব গণনা
    const wordFrequency: {[key: string]: number} = {};
    words.forEach(word => {
      const lowercaseWord = word.toLowerCase();
      wordFrequency[lowercaseWord] = (wordFrequency[lowercaseWord] || 0) + 1;
    });
    const sortedKeywords = Object.entries(wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .reduce((obj, [key, value]) => ({ ...obj, [key]: (value / words.length * 100).toFixed(2) }), {});
    setKeywordDensity(sortedKeywords);
  };

  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };

  const handleClear = () => {
    setText('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="dashboard">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigation} />
      <div className="tool-content word-counter">
        <h1>ওয়ার্ড কাউন্টার এবং SEO বিশ্লেষক</h1>
        <div className="input-container">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="আপনার টেক্সট এখানে লিখুন..."
          />
          <div className="button-group">
            <button onClick={handleClear} className="clear-button">
              <Trash2 size={16} /> পরিষ্কার করুন
            </button>
            <button onClick={handleCopy} className="copy-button">
              <Copy size={16} /> কপি করুন
            </button>
          </div>
        </div>
        <div className="stats-container">
          <div className="stat-item">
            <FileText size={24} />
            <div className="stat-info">
              <span className="stat-value">{wordCount}</span>
              <span className="stat-label">শব্দ</span>
            </div>
          </div>
          <div className="stat-item">
            <Type size={24} />
            <div className="stat-info">
              <span className="stat-value">{charCount}</span>
              <span className="stat-label">অক্ষর</span>
            </div>
          </div>
          <div className="stat-item">
            <Hash size={24} />
            <div className="stat-info">
              <span className="stat-value">{sentenceCount}</span>
              <span className="stat-label">বাক্য</span>
            </div>
          </div>
          <div className="stat-item">
            <Book size={24} />
            <div className="stat-info">
              <span className="stat-value">{paragraphCount}</span>
              <span className="stat-label">অনুচ্ছেদ</span>
            </div>
          </div>
          <div className="stat-item">
            <Clock size={24} />
            <div className="stat-info">
              <span className="stat-value">{readingTime}</span>
              <span className="stat-label">মিনিট পড়ার সময়</span>
            </div>
          </div>
        </div>
        <div className="additional-stats">
          <div className="stat-item">
            <div className="stat-info">
              <span className="stat-value">{uniqueWords}</span>
              <span className="stat-label">অনন্য শব্দ</span>
            </div>
          </div>
          <div className="stat-item stat-item-gap">
            <div className="stat-info">
              <span className="stat-value">{longestWord}</span>
              <span className="stat-label">দীর্ঘতম শব্দ</span>
            </div>
          </div>
        </div>
        <div className="seo-stats">
          <h3><Target size={20} /> SEO বিশ্লেষণ</h3>
          <div className="keyword-density">
            <h4>শীর্ষ কীওয়ার্ড ঘনত্ব:</h4>
            <ul>
              {Object.entries(keywordDensity).map(([keyword, density]) => (
                <li key={keyword}>{keyword}: {density}%</li>
              ))}
            </ul>
          </div>
          <div className="seo-tips">
            <h4>SEO পরামর্শ:</h4>
            <ul>
              <li>আপনার মূল কীওয়ার্ডের ঘনত্ব 1-2% এর মধ্যে রাখার চেষ্টা করুন।</li>
              <li>শিরোনামে (H1 ট্যাগে) মূল কীওয়ার্ড ব্যবহার করুন।</li>
              <li>প্রতি 300 শব্দে অন্তত একটি উপশিরোনাম (H2 বা H3 ট্যাগ) ব্যবহার করুন।</li>
              <li>আপনার কন্টেন্টের প্রথম 100 শব্দের মধ্যে মূল কীওয়ার্ড ব্যবহার করুন।</li>
              <li>বাহ্যিক লিঙ্ক এবং অভ্যন্তরীণ লিঙ্ক যোগ করতে ভুলবেন না।</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
