import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, Gift } from 'lucide-react';
import apiService from '../services/api';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await apiService.subscribeToNewsletter(email);
      setIsSubscribed(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Subscription failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/50 to-indigo-700/50"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8">
            <Mail className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Never Miss a <span className="text-yellow-300">Breakthrough</span>
          </h2>
          
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Get the latest psychology research, mental health insights, and therapeutic techniques delivered to your inbox every morning.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center space-x-3 bg-white/10 rounded-xl p-4">
              <Gift className="w-6 h-6 text-yellow-300" />
              <span className="text-white font-medium">Free Psychology Toolkit</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 rounded-xl p-4">
              <CheckCircle className="w-6 h-6 text-green-300" />
              <span className="text-white font-medium">Daily 3-Minute Reads</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 rounded-xl p-4">
              <CheckCircle className="w-6 h-6 text-green-300" />
              <span className="text-white font-medium">Expert Insights</span>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="max-w-md mx-auto">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 placeholder-purple-200 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                  required
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isLoading ? 'Subscribing...' : 'Subscribe'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            ) : (
              <div className="bg-green-500 text-white px-8 py-4 rounded-xl flex items-center justify-center space-x-2 animate-fade-in">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Thank you for subscribing!</span>
              </div>
            )}
            
            {error && (
              <div className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
          </div>

          <p className="text-purple-200 text-sm mt-6">
            Join 100,000+ professionals • No spam, ever • Unsubscribe anytime
          </p>

          {/* Social Proof */}
          <div className="mt-12 flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100,000+</div>
              <div className="text-purple-200 text-sm">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.9/5</div>
              <div className="text-purple-200 text-sm">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-purple-200 text-sm">Articles</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;