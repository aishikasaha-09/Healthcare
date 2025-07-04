import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import apiService from '../services/api';

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
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        
        // Fetch featured articles
        const featuredResponse = await apiService.getArticles({ 
          featured: true, 
          limit: 3 
        });
        setFeaturedArticles(featuredResponse.articles);
        
        // Fetch popular articles (sorted by views)
        const popularResponse = await apiService.getArticles({ 
          limit: 3,
          page: 1 
        });
        setPopularArticles(popularResponse.articles);
        
      } catch (err: any) {
        setError(err.message || 'Failed to fetch articles');
        console.error('Error fetching articles:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Fallback to static data if API fails
  const researchArticlesToShow = featuredArticles.length > 0 ? featuredArticles : researchArticles;
  const topArticlesToShow = popularArticles.length > 0 ? popularArticles : topArticles;

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Latest <span className="gradient-text">Research</span> & Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay ahead with cutting-edge psychology research and our most popular articles, curated by experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Research Insights */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-display font-bold text-gray-900 flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span>Research Insights</span>
              </h3>
              <Link 
                to="/articles?featured=true" 
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors group"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : (
                researchArticlesToShow.map((article, index) => {
                  const to = article.slug ? `/articles/${article.slug}` : `/pages/research-${article.id}`;
                  return (
                    <Link
                      to={to}
                      key={article.id}
                      className="flex space-x-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 group transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative overflow-hidden rounded-xl flex-shrink-0">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-24 h-24 object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                            {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : (article.date || 'Recent')}
                          </span>
                          <span className="text-purple-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          {/* Top Articles */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-display font-bold text-gray-900 flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">🔥</span>
                </div>
                <span>Top Articles</span>
              </h3>
              <Link 
                to="/articles" 
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors group"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
              ) : (
                topArticlesToShow.map((article, index) => {
                  const to = article.slug ? `/articles/${article.slug}` : `/pages/top-article-${article.id}`;
                  return (
                    <Link
                      to={to}
                      key={article.id}
                      className="flex space-x-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl hover:from-orange-100 hover:to-red-100 transition-all duration-300 group transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative overflow-hidden rounded-xl flex-shrink-0">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-24 h-24 object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                            {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : (article.date || 'Recent')}
                          </span>
                          <span className="text-orange-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;