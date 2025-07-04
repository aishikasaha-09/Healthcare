import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Users, BookOpen, Award, TrendingUp } from 'lucide-react';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    // Handle subscription logic here
  };

  const stats = [
    { icon: Users, value: '100,000+', label: 'Active Readers' },
    { icon: BookOpen, value: '500+', label: 'Articles Published' },
    { icon: Award, value: '98%', label: 'Satisfaction Rate' },
    { icon: TrendingUp, value: '50K+', label: 'Lives Improved' }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full opacity-15 animate-pulse-slow"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full text-sm font-medium mb-8 shadow-lg">
              <span className="mr-2 text-purple-700">Trusted by</span>
              <span className="font-bold gradient-text">100,000+ readers</span>
              <div className="ml-3 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-gray-900 leading-tight mb-8">
              Psychology
              <span className="block gradient-text">Made Simple</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
              Transform your understanding of the human mind with daily insights from leading psychology research. 
              <span className="font-semibold text-purple-600"> Evidence-based content</span> delivered in under 3 minutes.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mb-12">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg"
                required
              />
              <button
                type="submit"
                className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4 shadow-lg"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="flex items-center space-x-8">
              <button className="flex items-center space-x-3 text-purple-600 hover:text-purple-700 transition-colors group">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Play className="w-6 h-6 ml-1" />
                </div>
                <span className="font-medium">Watch Demo</span>
              </button>
              <div className="text-sm text-gray-500">
                <span className="font-semibold">4.9/5</span> rating from 2,000+ reviews
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Hero Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative max-w-lg mx-auto">
              {/* Main Image Container */}
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-purple-200 to-indigo-300 rounded-3xl shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-700">
                  <img
                    src="https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Psychology concepts"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-80 animate-bounce-slow shadow-lg"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-70 animate-float shadow-lg"></div>
                
                {/* Floating Cards */}
                <div className="absolute -left-4 top-1/4 bg-white rounded-xl p-4 shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Daily Insights</span>
                  </div>
                </div>
                
                <div className="absolute -right-4 bottom-1/4 bg-white rounded-xl p-4 shadow-xl transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">Expert Reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;