import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface TrialAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const TrialAlert: React.FC<TrialAlertProps> = ({ isOpen, onClose, onUpgrade }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-bold text-gray-900">Trial Expired</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 text-center text-lg font-semibold">
            YOUR FREE TRIAL IS OVER.<br />
            TAKE PREMIUM PLAN TO CONTINUE USING
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Maybe Later
          </button>
          <button
            onClick={onUpgrade}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-bold hover:scale-105 transition-transform"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrialAlert;