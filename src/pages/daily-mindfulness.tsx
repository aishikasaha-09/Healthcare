import React from 'react';

const DailyMindfulnessPage = () => {
  const [showBreath, setShowBreath] = React.useState(false);
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Understanding Mindfulness and Its Mental Health Benefits</h1>
      <img
        src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Mindfulness meditation"
        className="rounded-lg mb-6 w-full h-64 object-cover shadow-md"
      />
      <p className="text-lg text-gray-800 mb-4">
        Mindfulness is the practice of paying attention to the present moment with openness and curiosity. It helps us become aware of our thoughts and feelings without judgment, which can reduce stress and improve emotional well-being. Studies show that regular mindfulness practice can rewire the brain, making it easier to manage anxiety and negative emotions.
      </p>
      <p className="text-lg text-gray-800 mb-4">
        Mindfulness is used in therapies like Mindfulness-Based Stress Reduction (MBSR) and Mindfulness-Based Cognitive Therapy (MBCT). Even a few minutes a day can make a difference. You don’t need special equipment—just a willingness to pause and notice your breath, body, and surroundings.
      </p>
      <img
        src="https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Calm nature"
        className="rounded-lg mb-6 w-full h-64 object-cover shadow-md"
      />
      <div className="bg-purple-50 p-4 rounded-lg mb-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-purple-600">Guided Breathing</h2>
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors mb-2"
          onClick={() => setShowBreath(!showBreath)}
        >
          {showBreath ? 'Hide' : 'Show'} 1-Minute Breathing Exercise
        </button>
        {showBreath && (
          <div className="mt-2 text-gray-800 text-center">
            <strong>Close your eyes and try this:</strong><br />
            Inhale slowly for 4 seconds...<br />
            Hold for 4 seconds...<br />
            Exhale for 4 seconds...<br />
            Repeat for 1 minute, focusing only on your breath.
          </div>
        )}
      </div>
      <p className="text-lg text-gray-800">
        Mindfulness is a skill anyone can develop. Start small, be patient, and notice how your mind and body respond.
      </p>
    </div>
  );
};

export default DailyMindfulnessPage;
