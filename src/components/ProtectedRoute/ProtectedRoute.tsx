import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!auth.currentUser) {
    // ব্যবহারকারী লগ ইন না থাকলে তাকে auth পেজে রিডাইরেক্ট করুন
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
