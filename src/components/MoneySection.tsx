import React from 'react';
import { ArrowRight, Brain } from 'lucide-react';

const therapyArticles = [
  {
    id: 1,
    title: "Introduction to Therapy Techniques #3: EMDR and Trauma Processing",
    excerpt: "Understanding Eye Movement Desensitization and Reprocessing and its effectiveness in treating PTSD.",
    date: "Dec 10, 2024",
    image: "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 2,
    title: "Therapy Techniques #2: Dialectical Behavior Therapy Skills",
    excerpt: "Learning distress tolerance, emotion regulation, and interpersonal effectiveness skills from DBT.",
    date: "Dec 5, 2024",
    image: "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 3,
    title: "Therapy Techniques #1: Understanding CBT Fundamentals",
    excerpt: "An introduction to cognitive behavioral therapy and how thoughts, feelings, and behaviors are connected.",
    date: "Nov 28, 2024",
    image: "https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 4,
    title: "Mental Health Milestones #4 — Building Resilience",
    excerpt: "Developing psychological resilience through evidence-based practices and mindset shifts.",
    date: "Nov 20, 2024",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

const MoneySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Brain className="w-8 h-8 text-purple-600" />
            <span>Therapy Guides</span>
          </h2>
          <a 
            href="/therapy" 
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {therapyArticles.map((article) => (
            <article 
              key={article.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-3">
                  {article.date}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoneySection;