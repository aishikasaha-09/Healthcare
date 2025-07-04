import React from 'react';
import { Youtube, Linkedin, Twitter, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-2xl font-display font-bold">BriefPsych</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Making psychology accessible to everyone through evidence-based insights and practical applications.
            </p>
            <div className="space-y-3">
              <a href="/therapy-finder" className="block text-purple-400 hover:text-purple-300 transition-colors duration-300">
                Find a Therapist
              </a>
              <a href="/mental-health-resources" className="block text-purple-400 hover:text-purple-300 transition-colors duration-300">
                Mental Health Resources
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-semibold mb-4">Contact Us</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="mailto:hello@briefpsych.com" className="hover:text-white transition-colors">
                  hello@briefpsych.com
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h5 className="font-semibold mb-4">Information</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/ethics" className="hover:text-white transition-colors">
                  Ethics Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="font-semibold mb-4">Mental Health Resources</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/crisis-support" className="hover:text-white transition-colors">
                  Crisis Support
                </a>
              </li>
              <li>
                <a href="/therapy-types" className="hover:text-white transition-colors">
                  Types of Therapy
                </a>
              </li>
              <li>
                <a href="/self-care" className="hover:text-white transition-colors">
                  Self-Care Guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-6">
              <a href="#" className="text-red-500 hover:text-red-400 transition-all duration-300 transform hover:scale-110">
                <Youtube className="w-7 h-7" />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-500 transition-all duration-300 transform hover:scale-110">
                <Linkedin className="w-7 h-7" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110">
                <Twitter className="w-7 h-7" />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-400 transition-all duration-300 transform hover:scale-110">
                <Instagram className="w-7 h-7" />
              </a>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <Heart className="w-5 h-5 text-red-500 animate-pulse" />
              <span>for mental wellness</span>
            </div>
          </div>
          
          <div className="text-center mt-8 text-gray-500">
            <p className="text-lg">BriefPsych © 2024. All Rights Reserved.</p>
            <p className="text-sm mt-2">Empowering minds, one insight at a time</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;