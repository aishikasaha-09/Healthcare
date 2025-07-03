import React from 'react';

const TopArticle1 = () => {
  const [showFact, setShowFact] = React.useState(false);
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">The Psychology of Social Media Addiction</h1>
      <img src="https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Social media addiction" className="rounded-lg mb-6 w-full h-64 object-cover shadow-md" />
      <p className="text-lg text-gray-800 mb-4">Social media platforms are designed to keep us engaged using dopamine-driven feedback loops and unpredictable rewards. This can lead to compulsive scrolling and difficulty disconnecting. Understanding these mechanisms can help us set healthier boundaries with technology.</p>
      <div className="bg-purple-50 p-4 rounded-lg mb-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-purple-600">Did You Know?</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors mb-2" onClick={() => setShowFact(!showFact)}>{showFact ? 'Hide' : 'Show'} Fact</button>
        {showFact && <div className="mt-2 text-gray-800">The average person spends over 2 hours a day on social media!</div>}
      </div>
      <p className="text-lg text-gray-800">Take breaks, set limits, and be mindful of your online habits for better mental health.</p>
    </div>
  );
};

export default TopArticle1;
