import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const TherapistChatbot: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your AI therapist. How are you feeling today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate AI response (replace with real API for production)
  const getAIResponse = async (userMessage: string) => {
    // Simple mood tracking/journaling logic
    if (/sad|down|bad|depressed|unhappy/i.test(userMessage)) {
      return "I'm sorry to hear that. Would you like to talk more about what's making you feel this way, or try a short mindfulness exercise?";
    }
    if (/happy|good|great|well|excited/i.test(userMessage)) {
      return "That's wonderful! What contributed to your positive mood today? Keeping track of these moments can help boost your well-being.";
    }
    if (/stress|anxious|anxiety|nervous/i.test(userMessage)) {
      return "Stress and anxiety are common. Would you like a grounding technique or to journal about your thoughts?";
    }
    if (/journal|write|note/i.test(userMessage)) {
      return "Journaling is a great way to process emotions. What would you like to write about today?";
    }
    return "Thank you for sharing. Would you like to continue, try a mood check-in, or get a guided exercise?";
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setIsLoading(true);
    const aiResponse = await getAIResponse(input);
    setMessages(msgs => [...msgs, { sender: 'bot', text: aiResponse }]);
    setInput('');
    setIsLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-purple-700 text-center">AI Therapist Chatbot</h2>
      <div className="h-64 overflow-y-auto bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2 rounded-xl max-w-xs ${msg.sender === 'user' ? 'bg-purple-100 text-right' : 'bg-indigo-100 text-left'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="mb-3 flex justify-start">
            <div className="px-4 py-2 rounded-xl bg-indigo-100 animate-pulse">Typing...</div>
          </div>
        )}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          disabled={isLoading || !input.trim()}
        >
          Send
        </button>
      </form>
      <div className="mt-4 text-xs text-gray-400 text-center">Premium users only. Your conversations are private and not stored.</div>
    </div>
  );
};

export default TherapistChatbot;
