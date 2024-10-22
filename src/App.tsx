import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Auth from './components/Auth/Auth';
import AboutUs from './components/Pages/AboutUs';
import ContactUs from './components/Pages/ContactUs';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ArticleRewriter from './components/Tools/ArticleRewriter';
import PlagiarismChecker from './components/Tools/PlagiarismChecker';
import SpeedChecker from './components/Tools/SpeedChecker';
import WordCounter from './components/Tools/WordCounter';
import TagGenerator from './components/Tools/TagGenerator';
import KeywordGenerator from './components/Tools/KeywordGenerator';

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/auth" element={<Auth />} />
            <Route path="/tools/article-rewriter" element={
              <ProtectedRoute>
                <ArticleRewriter />
              </ProtectedRoute>
            } />
            <Route path="/tools/plagiarism-checker" element={
              <ProtectedRoute>
                <PlagiarismChecker />
              </ProtectedRoute>
            } />
            <Route path="/tools/speed-checker" element={
              <ProtectedRoute>
                <SpeedChecker />
              </ProtectedRoute>
            } />
            <Route path="/tools/word-counter" element={
              <ProtectedRoute>
                <WordCounter />
              </ProtectedRoute>
            } />
            <Route path="/tools/tag-generator" element={
              <ProtectedRoute>
                <TagGenerator />
              </ProtectedRoute>
            } />
            <Route path="/tools/keyword-generator" element={
              <ProtectedRoute>
                <KeywordGenerator />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
