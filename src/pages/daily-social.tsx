import React from 'react';


const DailySocialPage = () => {
  // Interactive poll state
  const [poll, setPoll] = React.useState({
    yes: 0,
    no: 0,
    voted: false,
    choice: ''
  });

  const handleVote = (choice: 'yes' | 'no') => {
    if (poll.voted) return;
    setPoll((prev) => ({
      ...prev,
      [choice]: prev[choice] + 1,
      voted: true,
      choice
    }));
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Social Psychology: How Groups Influence Behavior</h1>
      <img
        src="https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Group discussion"
        className="rounded-lg mb-6 w-full h-64 object-cover shadow-md"
      />
      <p className="text-lg text-gray-800 mb-4">
        Social psychology explores how our thoughts, feelings, and behaviors are shaped by the presence and influence of others. From family and friends to coworkers and online communities, groups play a powerful role in guiding our actions—often in ways we don’t even realize. Classic experiments, like Solomon Asch’s conformity study, reveal that people are likely to go along with the group, even if it means contradicting their own senses or beliefs.
      </p>
      <div className="bg-purple-100 p-4 rounded-lg mb-6 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2 text-purple-700">Quick Poll</h2>
        <p className="mb-2 text-gray-700">Have you ever changed your opinion to match a group, even if you disagreed?</p>
        <div className="flex space-x-4 mb-2">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${poll.choice === 'yes' ? 'bg-purple-600 text-white' : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-50'}`}
            onClick={() => handleVote('yes')}
            disabled={poll.voted}
          >
            Yes
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${poll.choice === 'no' ? 'bg-purple-600 text-white' : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-50'}`}
            onClick={() => handleVote('no')}
            disabled={poll.voted}
          >
            No
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Yes: {poll.yes} &nbsp;|&nbsp; No: {poll.no}
        </div>
        {poll.voted && (
          <div className="mt-2 text-green-700 font-medium">Thank you for voting!</div>
        )}
      </div>
      <p className="text-lg text-gray-800 mb-4">
        This tendency to conform can be both helpful and harmful. On one hand, group norms can encourage positive behaviors, such as cooperation and kindness. On the other, they can lead to peer pressure or the spread of misinformation. Social proof—the idea that we look to others to decide what’s correct—affects everything from fashion trends to voting decisions. By understanding these influences, we can make more conscious choices and resist negative pressures.
      </p>
      <img
        src="https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="People collaborating"
        className="rounded-lg mb-6 w-full h-64 object-cover shadow-md"
      />
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2 text-purple-600">Try This!</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Notice when you’re following a group decision—ask yourself if it matches your own values.</li>
          <li>Start a conversation about group influence with friends or family.</li>
          <li>Practice making one independent choice today, even if it’s small.</li>
        </ul>
      </div>
      <p className="text-lg text-gray-800">
        Remember, groups can inspire us to grow, but it’s important to stay true to ourselves. By being aware of social influences, we can build stronger, more authentic connections with others.
      </p>
    </div>
  );
};

export default DailySocialPage;
