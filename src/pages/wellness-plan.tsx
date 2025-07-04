
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Star } from 'lucide-react';
import MindfulnessBingo from './mindfulness-bingo';
import MonthlyChallenge from './monthly-challenge';
import TrialAlert from '../components/TrialAlert';
import TrialBanner from '../components/TrialBanner';
import { getTrialStatus, initializeTrial, TrialData, updateChallengeProgress } from '../utils/trialManager';

const WellnessPlan = () => {
  const { isAuthenticated } = useAuth();
  const [isPremium, setIsPremium] = useState<boolean>(() => {
    const saved = localStorage.getItem('isPremium');
    return saved === 'true';
  });
  const [subscribed, setSubscribed] = useState<boolean>(() => {
    const saved = localStorage.getItem('isSubscribed');
    return saved === 'true';
  });
  // Points state for both games
  const [bingoPoints, setBingoPoints] = useState<number>(0);
  const [challengePoints, setChallengePoints] = useState<number>(0);
  // Trial management state
  const [trialData, setTrialData] = useState<TrialData>({ startDate: '', isActive: false, hasExpired: false, daysRemaining: 0 });
  const [showTrialAlert, setShowTrialAlert] = useState<boolean>(false);
  const [trialStarted, setTrialStarted] = useState<boolean>(false);

  // Calculate total points and discount
  const totalPoints = bingoPoints + challengePoints;
  // Example: 100 points = 10% discount, max 50%
  const discount = Math.min(Math.floor(totalPoints / 100) * 10, 50);

  // Check if user has access (either premium or active trial)
  const hasAccess = isPremium || trialData.isActive;

  useEffect(() => {
    const checkTrial = () => {
      const trial = getTrialStatus();
      setTrialData(trial);

      // Check monthly challenge progress and update trial status
      const savedProgress = localStorage.getItem('monthly_challenge_progress');
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        const completedDays = progress.completed ? progress.completed.filter((day: boolean) => day).length : 0;
        const updatedTrial = updateChallengeProgress(completedDays);
        setTrialData(updatedTrial);
        // If trial just expired, show alert automatically
        if (!isPremium && updatedTrial.hasExpired) {
          setShowTrialAlert(true);
        }
      } else {
        // If trial just expired, show alert automatically
        if (!isPremium && trial.hasExpired) {
          setShowTrialAlert(true);
        }
      }
    };

    checkTrial();

    // Also set up an interval to check for trial expiration every 2 seconds
    const interval = setInterval(checkTrial, 2000);
    return () => clearInterval(interval);
  }, [isPremium, showTrialAlert]);

  const handleStartTrial = () => {
    const trial = initializeTrial();
    setTrialData(trial);
    setTrialStarted(true);
  };

  const handleUpgrade = () => {
    setIsPremium(true);
    setShowTrialAlert(false);
    // Clear any trial-related alerts
    localStorage.removeItem('last_trial_alert');
    // Save premium status
    localStorage.setItem('isPremium', 'true');
  };

  const handleSubscribe = () => {
    setSubscribed(true);
    // Save subscription status
    localStorage.setItem('isSubscribed', 'true');
  };

  const handleCloseAlert = () => {
    setShowTrialAlert(false);
  };

  const handleTrialExhausted = () => {
    setShowTrialAlert(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">Personalized Wellness Plan</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Login Required</h2>
          <p className="text-gray-700 mb-4">You must be logged in to access the wellness plan and interactive activities.</p>
          <div className="flex justify-center space-x-4">
            <a href="/login" className="px-6 py-2 bg-purple-600 text-white rounded-lg font-bold shadow hover:bg-purple-700 transition">Login</a>
            <a href="/register" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow hover:bg-indigo-700 transition">Sign Up</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Personalized Wellness Plan</h1>
      {/* ...existing code... */}
      {/* Trial Banner - Only show if not premium */}
      {!isPremium && (
        <TrialBanner trialData={trialData} onStartTrial={handleStartTrial} />
      )}

      {/* Premium Status Banner */}
      {isPremium && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-bold text-green-700">Premium Account Active</h3>
          </div>
          <p className="text-green-600">
            You have unlimited access to all wellness plan features and challenges!
          </p>
        </div>
      )}

      {/* Content - Show only if user has access */}
      {hasAccess ? (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-green-600">Step 1: Mindfulness Bingo</h2>
            <MindfulnessBingo
              externalPoints={bingoPoints}
              setExternalPoints={setBingoPoints}
              hideHeader={true}
            />
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-pink-600">Step 2: Complete the Monthly Challenge</h2>
            <MonthlyChallenge
              externalPoints={challengePoints}
              setExternalPoints={setChallengePoints}
              hideHeader={true}
              onTrialExhausted={handleTrialExhausted}
              hasAccess={hasAccess}
            />
          </div>
          <div className="mb-8 text-center text-lg font-semibold text-gray-700">
            Total Points: <span className="text-purple-700">{totalPoints}</span> <br />
            Premium Discount: <span className="text-green-700">{discount}%</span>
          </div>
        </>
      ) : (
        <div className="bg-gray-50 p-8 rounded-lg mb-4 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Premium Content Locked</h3>
          <p className="text-gray-600 mb-4">
            Start your free trial or upgrade to premium to access the wellness plan activities.
            <br />
            <span className="text-sm text-gray-500">
              With the free trial, you can complete 3 monthly challenge days before needing to upgrade.
            </span>
          </p>
        </div>
      )}

      {/* Premium Upgrade Section */}
      {!isPremium ? (
        <div className="bg-purple-50 p-4 rounded-lg mb-4 text-center">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">Unlock Premium Features</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-2 text-left inline-block">
            <li>Track your progress with beautiful charts</li>
            <li>Access exclusive daily tips and audio guides</li>
            <li>Download your plan as PDF</li>
            <li>Priority support</li>
            <li><span className="text-green-700 font-bold">Use your points for up to 50% off!</span></li>
          </ul>
          <button
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-transform mt-2"
            onClick={handleUpgrade}
          >
            Upgrade to Premium
          </button>
          {!subscribed && (
            <div className="mt-4">
              <button
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
                onClick={handleSubscribe}
              >
                Subscribe Now ({discount}% off)
              </button>
            </div>
          )}
          {subscribed && (
            <div className="mt-4 text-green-700 font-semibold">Thank you for subscribing! Premium features unlocked.</div>
          )}
        </div>
      ) : (
        <div className="bg-green-50 p-4 rounded-lg mb-4 text-green-700 font-semibold text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Star className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold">Premium Features Unlocked!</h3>
          </div>
          <p>Enjoy unlimited access to all wellness plan features and tools.</p>
          <div className="mt-3 text-sm text-green-600">
            Total Points Earned: <span className="font-bold">{totalPoints}</span>
          </div>
        </div>
      )}

      {/* Trial Alert Modal */}
      <TrialAlert
        isOpen={showTrialAlert}
        onClose={handleCloseAlert}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
};

export default WellnessPlan;
