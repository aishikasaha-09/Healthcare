import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';

const researchArticles = [
  {
    id: 1,
    title: "Latest Breakthrough in Depression Treatment",
    excerpt: "New research reveals promising results for ketamine-assisted therapy in treatment-resistant depression.",
    date: "Dec 15, 2024",
    image: "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 2,
    title: "The Neuroscience of Learning and Memory",
    excerpt: "Recent studies show how sleep and exercise enhance neuroplasticity and cognitive performance.",
    date: "Dec 14, 2024",
    image: "https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 3,
    title: "Understanding Autism Spectrum Disorders",
    excerpt: "New diagnostic tools and therapeutic approaches are improving outcomes for individuals with ASD.",
    date: "Dec 13, 2024",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];

const topArticles = [
  {
    id: 1,
    title: "The Psychology of Social Media Addiction",
    excerpt: "How dopamine loops and variable reward schedules keep us scrolling endlessly.",
    date: "Dec 10, 2024",
    image: "https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 2,
    title: "Emotional Intelligence in the Workplace",
    excerpt: "Why EQ matters more than IQ for career success and team collaboration.",
    date: "Dec 8, 2024",
    image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 3,
    title: "The Science of Procrastination",
    excerpt: "Understanding the psychological mechanisms behind delay and avoidance behaviors.",
    date: "Dec 5, 2024",
    image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];

const ResearchSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Research Insights */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <span>Research Insights</span>
              </h2>
              <a 
                href="/research" 
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-6">
              {researchArticles.map((article) => {
                let to = "/pages/research-" + article.id;
                return (
                  <Link
                    to={to}
                    key={article.id}
                    className="flex space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <span className="text-xs text-gray-500">{article.date}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Top Articles */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Top Articles</h2>
              <a 
                href="/top-articles" 
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-6">
              {topArticles.map((article) => {
                let to = "/pages/top-article-" + article.id;
                return (
                  <Link
                    to={to}
                    key={article.id}
                    className="flex space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <span className="text-xs text-gray-500">{article.date}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;