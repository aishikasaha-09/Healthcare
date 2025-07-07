import React, { useState, useEffect } from 'react';
import { Brain, Clock, Users, BookOpen, Shield, Zap, Target, Award } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "Evidence-Based Content",
    description: "Every article is backed by peer-reviewed research and reviewed by psychology professionals.",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: Clock,
    title: "Daily 3-Minute Reads",
    description: "Get your daily dose of psychology insights in just 3 minutes - perfect for busy professionals.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    title: "Expert Community",
    description: "Join a community of psychologists, researchers, and mental health advocates.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: BookOpen,
    title: "Comprehensive Library",
    description: "Access our extensive archive of psychology articles, research summaries, and insights.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Shield,
    title: "Trusted Sources",
    description: "Content sourced from leading psychology journals and research institutions worldwide.",
    color: "from-pink-500 to-purple-500"
  },
  {
    icon: Zap,
    title: "Instant Insights",
    description: "Get the latest psychology research delivered to your inbox as soon as it's published.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Target,
    title: "Practical Applications",
    description: "Learn how to apply psychological principles in your daily life and professional work.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "Winner of multiple awards for excellence in psychology education and communication.",
    color: "from-teal-500 to-blue-500"
  }
];

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Why Choose <span className="gradient-text">BriefPsych?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes BriefPsych the trusted source for psychology insights among professionals and enthusiasts worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative group p-8 rounded-3xl bg-gradient-to-br ${feature.color} transform transition-all duration-500 hover:scale-105 cursor-pointer card-hover`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-white/90 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Animated background elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4">
            <button className="btn-primary text-lg px-8 py-4">
              Start Your Journey
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              Learn More
            </button>
          </div>
          <p className="text-gray-500 mt-4">
            Join 100,000+ readers who trust BriefPsych for their daily psychology insights
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;