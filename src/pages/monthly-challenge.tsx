import React, { useState, useEffect } from 'react';

const daysInMonth = 30;
const ghibliColors = [
  'bg-pink-200', 'bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-purple-200',
  'bg-pink-100', 'bg-yellow-100', 'bg-green-100', 'bg-blue-100', 'bg-purple-100'
];
const challenges = [
  'Write a gratitude note', 'Try a new recipe', 'Go for a walk', 'Read a book', 'Meditate 10 min',
  'Draw something', 'Call a friend', 'No phone after 8pm', 'Plant a seed', 'Listen to music',
  'Do yoga', 'Cook a healthy meal', 'Journal your thoughts', 'Compliment someone', 'Watch the sunset',
  'Try origami', 'Cloud watch', 'Dance to a song', 'Mindful eating', 'Stretch for 5 min',
  'Smile at yourself', 'Digital detox', 'Write a poem', 'Try a new hobby', 'Donate to charity',
  'Practice deep breathing', 'Make a vision board', 'Clean your room', 'Try a new tea', 'Sketch outdoors',
  'Reflect on your month'
];


interface MonthlyChallengeProps {
  externalPoints?: number;
  setExternalPoints?: (points: number) => void;
  hideHeader?: boolean;
  onTrialExhausted?: () => void;
  hasAccess?: boolean;
}

const MonthlyChallenge: React.FC<MonthlyChallengeProps> = ({ 
  externalPoints, 
  setExternalPoints, 
  hideHeader, 
  onTrialExhausted,
  hasAccess = true 
}) => {
  const [completed, setCompleted] = useState<boolean[]>(Array(daysInMonth).fill(false));
  const [points, setPoints] = useState<number>(externalPoints ?? 0);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('monthly_challenge_progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompleted(progress.completed || Array(daysInMonth).fill(false));
      setPoints(progress.points || 0);
    }
  }, []);

  React.useEffect(() => {
    if (typeof externalPoints === 'number' && externalPoints !== points) {
      setPoints(externalPoints);
    }
    // eslint-disable-next-line
  }, [externalPoints]);

  const handleClick = (idx: number) => {
    if (!completed[idx]) {
      // Check if user is trying to access day 5 or beyond without premium access
      const completedDays = completed.filter(day => day).length;

      if (completedDays >= 4 && !hasAccess && onTrialExhausted) {
        onTrialExhausted();
        return;
      }

      const newCompleted = [...completed];
      newCompleted[idx] = true;
      setCompleted(newCompleted);
      const newPoints = points + 20;
      setPoints(newPoints);
      if (setExternalPoints) setExternalPoints(newPoints);

      // Save progress to localStorage
      const progress = {
        completed: newCompleted,
        points: newPoints
      };
      localStorage.setItem('monthly_challenge_progress', JSON.stringify(progress));

      // Check if user just completed their 4th day
      const newCompletedCount = newCompleted.filter(day => day).length;
      if (newCompletedCount === 4 && !hasAccess && onTrialExhausted) {
        // Show a message that trial is about to end
        setTimeout(() => {
          onTrialExhausted();
        }, 1000); // Show after 1 second to let them see the completion
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {!hideHeader && <h1 className="text-3xl font-bold mb-4 text-pink-700 text-center font-ghibli">Monthly Challenge</h1>}
      <div className="mb-4 text-center text-lg font-semibold text-gray-700">Points: {points}</div>
      <div className="grid grid-cols-6 gap-3 bg-gradient-to-br from-pink-100 via-yellow-100 to-green-100 p-6 rounded-3xl shadow-2xl">
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const completedDays = completed.filter(day => day).length;
          // Lock after 4 completions (i.e., on 5th and beyond)
          const isLocked = !hasAccess && completedDays >= 4 && !completed[idx];

          return (
            <button
              key={idx}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 h-24 w-24 mx-auto font-ghibli text-sm font-semibold shadow-md transition-all duration-200 ${
                isLocked 
                  ? 'bg-gray-200 border-gray-400 opacity-50 cursor-not-allowed' 
                  : ghibliColors[idx % ghibliColors.length]
              } ${completed[idx] ? 'border-green-500 scale-95 opacity-70' : 'border-pink-300 hover:scale-105'}`}
              onClick={() => handleClick(idx)}
              disabled={completed[idx] || isLocked}
            >
              <span className="mb-2">Day {idx + 1}</span>
              <span className="mb-1">{challenges[idx % challenges.length]}</span>
              {completed[idx] && <span className="mt-1 text-green-600 text-2xl">✔</span>}
              {isLocked && <span className="mt-1 text-gray-500 text-lg">🔒</span>}
            </button>
          );
        })}
      </div>
      <div className="mt-6 text-center text-lg text-gray-600 font-ghibli">
        Complete challenges to earn points and unlock discounts on Premium!
        {!hasAccess && (
          <div className="mt-2 text-sm text-red-600 font-medium">
            🔒 Free trial allows only 3 challenge days. Upgrade to premium for unlimited access!
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyChallenge;
