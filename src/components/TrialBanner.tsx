import React from 'react';
import { Clock, Star } from 'lucide-react';
import { TrialData } from '../utils/trialManager';

interface TrialBannerProps {
  trialData: TrialData;
  onStartTrial: () => void;
}

const TrialBanner: React.FC<TrialBannerProps> = ({ trialData, onStartTrial }) => {
  if (trialData.hasExpired) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-bold text-red-700">Trial Expired</h3>
        </div>
        <p className="text-red-600 mb-3">
          Your 3-day free trial has ended. Upgrade to premium to continue using all features.
        </p>
      </div>
    );
  }

  if (trialData.isActive) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Star className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-bold text-blue-700">Free Trial Active</h3>
        </div>
        <p className="text-blue-600 mb-3">
          You have <span className="font-bold">{trialData.daysRemaining} day{trialData.daysRemaining !== 1 ? 's' : ''}</span> remaining in your free trial.
          <br />
          <span className="text-sm">Complete monthly challenges to use your trial days!</span>
        </p>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(trialData.daysRemaining / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2 mb-2">
        <Star className="w-5 h-5 text-purple-500" />
        <h3 className="text-lg font-bold text-purple-700">Start Your Free Trial</h3>
      </div>
      <p className="text-purple-600 mb-3">
        Get 3 days of premium access completely free! No credit card required.
        <br />
        <span className="text-sm">Complete monthly challenges to use your 3 trial days!</span>
      </p>
      <button
        onClick={onStartTrial}
        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-bold hover:scale-105 transition-transform"
      >
        Start Free Trial
      </button>
    </div>
  );
};

export default TrialBanner;