import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "The Science Behind Cognitive Behavioral Therapy",
    excerpt: "Understanding how CBT works and why it's one of the most effective treatments for anxiety and depression.",
    date: "Dec 15, 2024",
    image: "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=400",
    readTime: "3 min read"
  },
  {
    id: 2,
    title: "Understanding Mindfulness and Its Mental Health Benefits",
    excerpt: "How mindfulness meditation can rewire your brain for better emotional regulation and stress management.",
    date: "Dec 14, 2024",
    image: "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=400",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "The Psychology of Habit Formation",
    excerpt: "Discover the neuroscience behind habits and evidence-based strategies for building positive behaviors.",
    date: "Dec 13, 2024",
    image: "https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=400",
    readTime: "5 min read"
  },
  {
    id: 4,
    title: "Social Psychology: How Groups Influence Behavior",
    excerpt: "Exploring conformity, social proof, and group dynamics in modern society.",
    date: "Dec 12, 2024",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    readTime: "4 min read"
  },
  // Added boxes in your name section
  {
    id: 5,
    title: "About You: [Your Name]",
    excerpt: "Discover more about [Your Name], their journey, and their passion for psychology.",
    date: "Jul 4, 2025",
    image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400",
    readTime: "2 min read"
  },
  {
    id: 6,
    title: "[Your Name]'s Favorite Book",
    excerpt: "A look at the book that inspired [Your Name]'s interest in psychology.",
    date: "Jul 4, 2025",
    image: "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=400",
    readTime: "2 min read"
  },
  {
    id: 7,
    title: "[Your Name]'s Daily Routine",
    excerpt: "How [Your Name] applies psychological principles in daily life.",
    date: "Jul 4, 2025",
    image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=400",
    readTime: "2 min read"
  },
  {
    id: 8,
    title: "[Your Name]'s Top Psychology Quote",
    excerpt: "A quote that motivates [Your Name] every day.",
    date: "Jul 4, 2025",
    image: "https://images.pexels.com/photos/261909/pexels-photo-261909.jpeg?auto=compress&cs=tinysrgb&w=400",
    readTime: "1 min read"
  },
  {
    id: 9,
    title: "[Your Name]'s Favorite Psychologist",
    excerpt: "Learn about the psychologist who inspires [Your Name] the most.",
    date: "Jul 4, 2025",
    image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
    readTime: "2 min read"
  },
  {
    id: 10,
    title: "[Your Name]'s Wellness Tip",
    excerpt: "A daily wellness tip from [Your Name] to boost your mental health.",
    date: "Jul 4, 2025",
    image: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400",
    readTime: "1 min read"
  },
];

const DailySection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Daily <span className="gradient-text">Psychology</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the latest insights from psychology research, delivered fresh every day in easy-to-digest articles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.slice(0, 4).map((article, index) => {
            let to = "/pages/daily-psycho";
            if (article.id === 1) to = "/pages/daily-cbt";
            if (article.id === 2) to = "/pages/daily-mindfulness";
            if (article.id === 3) to = "/pages/daily-habits";
            if (article.id === 4) to = "/pages/daily-social";
            return (
              <Link
                to={to}
                key={article.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group block transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-purple-600">
                    {article.readTime}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-purple-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/daily"
            className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DailySection;