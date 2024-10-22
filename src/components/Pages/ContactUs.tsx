import React, { useState } from 'react';
import './Pages.css';

const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // এখানে যোগাযোগ ফর্ম সাবমিট লজিক যোগ করুন
    console.log('Form submitted:', { name, email, message });
    // ফর্ম রিসেট করুন
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="page-container">
      <h1>যোগাযোগ করুন</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">নাম</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">ইমেইল</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">বার্তা</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">পাঠান</button>
      </form>
    </div>
  );
};

export default ContactUs;
