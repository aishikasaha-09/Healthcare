import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900">BriefPsych</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/daily" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Daily Psychology
            </Link>
            <Link to="/research" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Research Insights
            </Link>
            {/* <Link to="/newsletter" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Newsletter
            </Link> */}
            <Link to="/wellness-plan" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Wellness Plan
            </Link>
            {/* <Link to="/mindfulness-bingo" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Mindfulness Bingo
            </Link>
            <Link to="/monthly-challenge" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Monthly Challenge
            </Link> */}
            <Link to="/infographics" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Infographics
            </Link>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-200">
            <Link to="/daily" className="block text-gray-700 hover:text-purple-600 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
              Daily Psychology
            </Link>
            <Link to="/research" className="block text-gray-700 hover:text-purple-600 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
              Research Insights
            </Link>
            <Link to="/newsletter" className="block text-gray-700 hover:text-purple-600 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
              Newsletter
            </Link>
            <Link to="/wellness-plan" className="block text-gray-700 hover:text-purple-600 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
              Wellness Plan
            </Link>
            {/* <Link to="/mindfulness-bingo" className="block text-gray-700 hover:text-purple-600 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
              Mindfulness Bingo
            </Link>
            <Link to="/monthly-challenge" className="block text-gray-700 hover:text-purple-600 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
              Monthly Challenge
            </Link> */}
            <Link to="/infographics" className="block text-gray-700 hover:text-purple-600 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
              Infographics
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;