import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';
import './Profile.css';

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        if (auth.currentUser) {
          const userDoc = doc(db, 'users', auth.currentUser.uid);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setName(userData.name || '');
            setEmail(auth.currentUser.email || '');
            setBio(userData.bio || '');
            setPhone(userData.phone || '');
            setAddress(userData.address || '');
            setProfilePic(userData.profilePic || null);
          }
        }
      } catch (error) {
        console.error('ব্যবহারকারীর তথ্য লোড করার সময় ত্রুটি:', error);
        setError('তথ্য লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (auth.currentUser) {
        const userDoc = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDoc, { name, bio, phone, address });
        setIsEditing(false);
      }
    } catch (error) {
      console.error('প্রোফাইল আপডেট করার সময় ত্রুটি:', error);
      setError('প্রোফাইল আপডেট করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && auth.currentUser) {
      const file = e.target.files[0];
      const storageRef = ref(storage, `profilePics/${auth.currentUser.uid}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setProfilePic(downloadURL);
        const userDoc = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDoc, { profilePic: downloadURL });
      } catch (error) {
        console.error('প্রোফাইল ছবি আপলোড করার সময় ত্রুটি:', error);
        setError('প্রোফাইল ছবি আপলোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    }
  };

  if (isLoading) {
    return <div className="profile">লোড হচ্ছে...</div>;
  }

  if (error) {
    return <div className="profile error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>প্রোফাইল</h2>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="edit-button">
            <Edit2 size={16} /> সম্পাদনা করুন
          </button>
        )}
      </div>
      <div className="profile-content">
        <div className="profile-pic-container">
          <img src={profilePic || 'https://via.placeholder.com/150'} alt="Profile" className="profile-pic" />
          <input type="file" accept="image/*" onChange={handleProfilePicChange} id="profile-pic-input" />
          <label htmlFor="profile-pic-input" className="profile-pic-label">ছবি পরিবর্তন করুন</label>
        </div>
        <div className="profile-details">
          {isEditing ? (
            <div className="profile-edit">
              <div className="input-group">
                <User size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="নাম"
                />
              </div>
              <div className="input-group">
                <Mail size={20} />
                <input type="email" value={email} disabled />
              </div>
              <div className="input-group">
                <Edit2 size={20} />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="বায়ো"
                />
              </div>
              <div className="input-group">
                <Phone size={20} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="ফোন নম্বর"
                />
              </div>
              <div className="input-group">
                <MapPin size={20} />
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="ঠিকানা"
                />
              </div>
              <div className="button-group">
                <button onClick={handleUpdate} disabled={isLoading} className="save-button">
                  <Save size={16} /> {isLoading ? 'আপডেট হচ্ছে...' : 'আপডেট করুন'}
                </button>
                <button onClick={() => setIsEditing(false)} className="cancel-button">
                  <X size={16} /> বাতিল করুন
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-view">
              <p><User size={20} /> <strong>নাম:</strong> {name}</p>
              <p><Mail size={20} /> <strong>ইমেইল:</strong> {email}</p>
              <p><Edit2 size={20} /> <strong>বায়ো:</strong> {bio}</p>
              <p><Phone size={20} /> <strong>ফোন:</strong> {phone}</p>
              <p><MapPin size={20} /> <strong>ঠিকানা:</strong> {address}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
