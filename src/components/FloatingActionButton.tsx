import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, HelpCircle, Mail } from 'lucide-react';

const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const actions = [
    {
      icon: Mail,
      label: 'Contact',
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => console.log('Contact clicked')
    },
    {
      icon: HelpCircle,
      label: 'Help',
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => console.log('Help clicked')
    },
    {
      icon: MessageCircle,
      label: 'Feedback',
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => console.log('Feedback clicked')
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      <div className={`flex flex-col space-y-3 mb-4 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`w-12 h-12 rounded-full ${action.color} text-white shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center group`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <action.icon className="w-5 h-5" />
            <span className="absolute right-14 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
      >
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          {isOpen ? <ArrowUp className="w-6 h-6" /> : <ArrowUp className="w-6 h-6" />}
        </div>
      </button>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="w-12 h-12 bg-white text-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center mt-3 border-2 border-purple-200"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

export default FloatingActionButton;