import React from 'react';

const DailyHabitsPage = () => {
  const [step, setStep] = React.useState(0);
  const steps = [
    'Pick a small habit you want to build (e.g., drink a glass of water after waking up).',
    'Set a clear cue for your habit (e.g., place a water bottle by your bed).',
    'Reward yourself after completing the habit (e.g., say “Well done!” or check it off a list).',
    'Repeat daily and track your progress for a week.'
  ];
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">The Psychology of Habit Formation</h1>
      <img
        src="https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Habit tracking"
        className="rounded-lg mb-6 w-full h-64 object-cover shadow-md"
      />
      <p className="text-lg text-gray-800 mb-4">
        Habits are the building blocks of our daily lives. Neuroscience shows that habits are formed through repetition and are stored in the brain’s basal ganglia, making them automatic over time. Whether it’s brushing your teeth or checking your phone, habits shape our routines and influence our success.
      </p>
      <p className="text-lg text-gray-800 mb-4">
        Building positive habits starts with small, intentional actions. By setting clear cues and rewarding yourself, you can make new behaviors stick. Remember, it’s easier to add a new habit to an existing routine than to start from scratch.
      </p>
      <img
        src="https://images.pexels.com/photos/669986/pexels-photo-669986.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Routine"
        className="rounded-lg mb-6 w-full h-64 object-cover shadow-md"
      />
      <div className="bg-purple-50 p-4 rounded-lg mb-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-purple-600">Build a Habit: Step-by-Step</h2>
        <div className="mb-2 text-gray-700">{steps[step]}</div>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={step === steps.length - 1}
          >
            Next
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-500">Step {step + 1} of {steps.length}</div>
      </div>
      <p className="text-lg text-gray-800">
        Remember, consistency is key. Celebrate small wins and be patient with yourself as you build new habits!
      </p>
    </div>
  );
};

export default DailyHabitsPage;
