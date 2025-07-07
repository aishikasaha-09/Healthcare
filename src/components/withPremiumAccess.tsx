import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const withPremiumAccess = (Component: React.ComponentType) => {
  return function PremiumProtectedComponent(props: any) {
    const { isAuthenticated } = useAuth();
    const isPremium = localStorage.getItem('isPremium') === 'true';

    if (!isAuthenticated) {
      return (
        <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold mb-4 text-purple-700">Login Required</h2>
          <p className="mb-4 text-gray-700">Please log in to access this feature.</p>
          <a href="/login" className="px-6 py-2 bg-purple-600 text-white rounded-lg font-bold shadow hover:bg-purple-700 transition">Login</a>
        </div>
      );
    }
    if (!isPremium) {
      return (
        <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold mb-4 text-purple-700">Premium Required</h2>
          <p className="mb-4 text-gray-700">This feature is available for premium users only. Please upgrade to access the AI Therapist Chatbot.</p>
          <a href="/wellness-plan" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-bold shadow hover:scale-105 transition-transform">Upgrade to Premium</a>
        </div>
      );
    }
    return <Component {...props} />;
  };
};

export default withPremiumAccess;
