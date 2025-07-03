import React from 'react';

const Research2 = () => {
  const [showTip, setShowTip] = React.useState(false);
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">The Neuroscience of Learning and Memory</h1>
      <img src="https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Brain and learning" className="rounded-lg mb-6 w-full h-64 object-cover shadow-md" />
      <p className="text-lg text-gray-800 mb-4">Recent studies show that both sleep and exercise play a crucial role in enhancing neuroplasticity—the brain’s ability to adapt and form new connections. Good sleep consolidates memories, while physical activity boosts cognitive performance and creativity. These findings highlight the importance of healthy routines for lifelong learning.</p>
      <div className="bg-purple-50 p-4 rounded-lg mb-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-purple-600">Brain Tip</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors mb-2" onClick={() => setShowTip(!showTip)}>{showTip ? 'Hide' : 'Show'} Sleep & Exercise Tip</button>
        {showTip && <div className="mt-2 text-gray-800">Try a brisk walk or a short nap before studying to boost your memory and focus!</div>}
      </div>
      <p className="text-lg text-gray-800">Remember, small changes in your daily routine can have a big impact on your brain’s ability to learn and remember.</p>
    </div>
  );
};

export default Research2;
