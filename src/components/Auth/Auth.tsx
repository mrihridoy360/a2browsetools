import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, loginWithGoogle } from '../../firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { FaGoogle, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import './Auth.css';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      if (isLogin) {
        const { user, error } = await loginUser(email, password);
        if (error) throw new Error(error);
        console.log('লগইন সফল:', user);
      } else {
        const { user, error } = await registerUser(email, password);
        if (error) throw new Error(error);
        console.log('রেজিস্ট্রেশন সফল:', user);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const { user, error } = await loginWithGoogle();
      if (error) throw new Error(error);
      console.log('Google দিয়ে লগইন সফল:', user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>{isLogin ? 'লগইন' : 'রেজিস্ট্রেশন'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="নাম"
                required
              />
            </div>
          )}
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ইমেইল"
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="পাসওয়ার্ড"
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'প্রক্রিয়াকরণ হচ্ছে...' : (isLogin ? 'লগইন' : 'রেজিস্টার')}
          </button>
        </form>
        <button onClick={handleGoogleLogin} className="google-button" disabled={isLoading}>
          <FaGoogle className="google-icon" /> Google দিয়ে লগইন করুন
        </button>
        <p className="toggle-text">
          {isLogin ? 'অ্যাকাউন্ট নেই?' : 'ইতিমধ্যে অ্যাকাউন্ট আছে?'}
          <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
            {isLogin ? 'রেজিস্ট্রেশন করুন' : 'লগইন করুন'}
          </button>
        </p>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Auth;
