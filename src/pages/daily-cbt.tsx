import React from 'react';

const DailyCBTPage = () => {
  const [showTip, setShowTip] = React.useState(false);
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">The Science Behind Cognitive Behavioral Therapy</h1>
      <img
        src="https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Therapy session"
        className="rounded-lg mb-6 w-full h-64 object-cover shadow-md"
      />
      <p className="text-lg text-gray-800 mb-4">
        Cognitive Behavioral Therapy (CBT) is a powerful, evidence-based approach for treating anxiety, depression, and many other mental health conditions. CBT helps people identify negative thought patterns and replace them with healthier, more realistic ones. By focusing on the connection between thoughts, feelings, and behaviors, CBT empowers individuals to break the cycle of negativity and build resilience.
      </p>
      <p className="text-lg text-gray-800 mb-4">
        CBT is structured and goal-oriented, often involving practical exercises and homework. For example, a therapist might ask you to keep a thought diary or practice new coping skills between sessions. Over time, these small steps can lead to significant improvements in mood and functioning. Research consistently shows that CBT is as effective as, or even more effective than, medication for many people.
      </p>
      <img
        src="https://images.pexels.com/photos/4498216/pexels-photo-4498216.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="CBT worksheet"
        className="rounded-lg mb-6 w-full h-64 object-cover shadow-md"
      />
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2 text-purple-600">CBT Quick Exercise</h2>
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors mb-2"
          onClick={() => setShowTip(!showTip)}
        >
          {showTip ? 'Hide' : 'Show'} Example Thought Challenge
        </button>
        {showTip && (
          <div className="mt-2 text-gray-800">
            <strong>Example:</strong> Next time you notice a negative thought (e.g., "I always mess up"), pause and ask yourself: <em>Is this really true? What evidence do I have?</em> Try to reframe it in a more balanced way (e.g., "Sometimes I make mistakes, but I also succeed").
          </div>
        )}
      </div>
      <p className="text-lg text-gray-800">
        CBT is about progress, not perfection. With practice, anyone can learn to challenge unhelpful thoughts and build a healthier mindset.
      </p>
    </div>
  );
};

export default DailyCBTPage;
