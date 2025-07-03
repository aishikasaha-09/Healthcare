import React from 'react';

const Research1 = () => (
  <div className="max-w-3xl mx-auto py-16 px-4">
    <h1 className="text-3xl font-bold mb-6 text-purple-700">Latest Breakthrough in Depression Treatment</h1>
    <img src="https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Ketamine-assisted therapy" className="rounded-lg mb-6 w-full h-64 object-cover shadow-md" />
    <p className="text-lg text-gray-800 mb-4">Recent research has shown that ketamine-assisted therapy offers hope for individuals with treatment-resistant depression. Unlike traditional antidepressants, ketamine works rapidly and can provide relief within hours. Clinical trials have demonstrated significant improvements in mood and functioning, especially when combined with psychotherapy. However, more research is needed to understand long-term effects and best practices for safe use.</p>
    <div className="bg-purple-50 p-4 rounded-lg mb-6 flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-2 text-purple-600">Quick Poll</h2>
      <ResearchPoll question="Do you think new therapies like ketamine should be more widely available?" />
    </div>
    <p className="text-lg text-gray-800">As science advances, it’s important to balance innovation with safety and ethical considerations. Stay informed and consult professionals before considering new treatments.</p>
  </div>
);

function ResearchPoll({ question }: { question: string }) {
  const [votes, setVotes] = React.useState({ yes: 0, no: 0 });
  const [voted, setVoted] = React.useState(false);
  return (
    <div className="text-center">
      <p className="mb-2">{question}</p>
      <button className="px-4 py-2 m-1 bg-purple-600 text-white rounded-lg" disabled={voted} onClick={() => { setVotes(v => ({ ...v, yes: v.yes + 1 })); setVoted(true); }}>Yes</button>
      <button className="px-4 py-2 m-1 bg-purple-600 text-white rounded-lg" disabled={voted} onClick={() => { setVotes(v => ({ ...v, no: v.no + 1 })); setVoted(true); }}>No</button>
      <div className="mt-2 text-gray-700">Yes: {votes.yes} | No: {votes.no}</div>
      {voted && <div className="mt-2 text-green-700 font-medium">Thank you for voting!</div>}
    </div>
  );
}

export default Research1;
