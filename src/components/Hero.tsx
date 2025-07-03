import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    // Handle subscription logic here
  };

  return (
    <section className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="flex-1 lg:pr-16 mb-12 lg:mb-0">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-sm text-purple-700 font-medium mb-6">
              <span className="mr-2">Loved by</span>
              <span className="font-bold text-purple-800">100,000+ readers</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Psychology<br className="hidden lg:block" />
              <span className="text-purple-600">Made Simple</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join BriefPsych and get your daily dose of the latest psychology research, 
              mental health insights, and therapeutic techniques delivered in plain English. 
              In less than 3 minutes.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>SUBSCRIBE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Content - Hero Image */}
          <div className="flex-1 relative">
            <div className="relative max-w-md mx-auto">
              <div className="aspect-[3/4] bg-gradient-to-br from-purple-200 to-indigo-300 rounded-3xl shadow-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Psychology concepts"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300 rounded-full opacity-80"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-200 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;