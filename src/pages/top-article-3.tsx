import React from 'react';

const TopArticle3 = () => {
  const [showStep, setShowStep] = React.useState(false);
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">The Science of Procrastination</h1>
      <img src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Procrastination" className="rounded-lg mb-6 w-full h-64 object-cover shadow-md" />
      <p className="text-lg text-gray-800 mb-4">Procrastination is a common challenge, driven by fear of failure, perfectionism, or lack of motivation. Understanding the psychological roots can help us overcome it and become more productive.</p>
      <div className="bg-purple-50 p-4 rounded-lg mb-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-purple-600">Beat Procrastination</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors mb-2" onClick={() => setShowStep(!showStep)}>{showStep ? 'Hide' : 'Show'} Quick Tip</button>
        {showStep && <div className="mt-2 text-gray-800">Break big tasks into small, manageable steps and start with the easiest one!</div>}
      </div>
      <p className="text-lg text-gray-800">Remember, progress is better than perfection. Take action, even if it’s small!</p>
    </div>
  );
};

export default TopArticle3;
