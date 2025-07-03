import React from 'react';

const TopArticle2 = () => {
  const [showEQ, setShowEQ] = React.useState(false);
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Emotional Intelligence in the Workplace</h1>
      <img src="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Emotional intelligence" className="rounded-lg mb-6 w-full h-64 object-cover shadow-md" />
      <p className="text-lg text-gray-800 mb-4">Emotional intelligence (EQ) is the ability to recognize, understand, and manage our own emotions and those of others. In the workplace, high EQ leads to better teamwork, communication, and leadership. It’s often more important than IQ for career success.</p>
      <div className="bg-purple-50 p-4 rounded-lg mb-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-purple-600">EQ Quiz</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors mb-2" onClick={() => setShowEQ(!showEQ)}>{showEQ ? 'Hide' : 'Show'} EQ Tip</button>
        {showEQ && <div className="mt-2 text-gray-800">Try active listening in your next conversation—focus fully on the other person without planning your response.</div>}
      </div>
      <p className="text-lg text-gray-800">Practice empathy and self-awareness to boost your EQ and workplace relationships.</p>
    </div>
  );
};

export default TopArticle2;
