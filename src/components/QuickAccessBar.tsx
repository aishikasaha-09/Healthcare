import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Share2, Settings, Bell } from 'lucide-react';

const QuickAccessBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      // Show when user scrolls past the first viewport
      if (scrollTop > windowHeight * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickActions = [
    {
      id: 'search',
      icon: Search,
      label: 'Search',
      action: () => {
        console.log('Search clicked');
        // Add search functionality
      }
    },
    {
      id: 'bookmark',
      icon: Bookmark,
      label: 'Bookmarks',
      action: () => {
        console.log('Bookmark clicked');
        // Add bookmark functionality
      }
    },
    {
      id: 'share',
      icon: Share2,
      label: 'Share',
      action: () => {
        console.log('Share clicked');
        // Add share functionality
      }
    },
    {
      id: 'notifications',
      icon: Bell,
      label: 'Notifications',
      action: () => {
        console.log('Notifications clicked');
        // Add notifications functionality
      }
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      action: () => {
        console.log('Settings clicked');
        // Add settings functionality
      }
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed top-1/2 left-4 transform -translate-y-1/2 z-40">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-2">
        <div className="flex flex-col space-y-2">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              onMouseEnter={() => setActiveItem(action.id)}
              onMouseLeave={() => setActiveItem(null)}
              className="relative w-12 h-12 flex items-center justify-center rounded-xl hover:bg-purple-100 transition-all duration-300 transform hover:scale-110 group"
            >
              <action.icon className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
              
              {/* Tooltip */}
              {activeItem === action.id && (
                <div className="absolute left-16 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap z-50">
                  {action.label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickAccessBar;