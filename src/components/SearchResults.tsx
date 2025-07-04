import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowLeft, Calendar, Clock } from 'lucide-react';

// Mock search results - in a real app, this would come from an API
const mockResults = [
  {
    id: 1,
    title: "The Science Behind Cognitive Behavioral Therapy",
    excerpt: "Understanding how CBT works and why it's one of the most effective treatments for anxiety and depression.",
    type: "Daily Psychology",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    image: "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 2,
    title: "Latest Breakthrough in Depression Treatment",
    excerpt: "New research reveals promising results for ketamine-assisted therapy in treatment-resistant depression.",
    type: "Research",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 3,
    title: "Introduction to Therapy Techniques #3: EMDR and Trauma Processing",
    excerpt: "Understanding Eye Movement Desensitization and Reprocessing and its effectiveness in treating PTSD.",
    type: "Therapy Guide",
    date: "Dec 10, 2024",
    readTime: "12 min read",
    image: "https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 4,
    title: "Mental Health Statistics Worldwide",
    excerpt: "A comprehensive overview of global mental health statistics and treatment accessibility.",
    type: "Infographic",
    date: "Dec 8, 2024",
    readTime: "Visual",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  // Filter results based on query (simple mock implementation)
  const filteredResults = query 
    ? mockResults.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : mockResults;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Daily Psychology': return 'bg-blue-100 text-blue-700';
      case 'Research': return 'bg-green-100 text-green-700';
      case 'Therapy Guide': return 'bg-purple-100 text-purple-700';
      case 'Infographic': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center space-x-3 mb-4">
            <Search className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Search Results</h1>
          </div>
          
          {query && (
            <p className="text-xl text-gray-600">
              {filteredResults.length} results found for "{query}"
            </p>
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredResults.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse our categories
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/daily" 
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Daily Psychology
              </Link>
              <Link 
                to="/research" 
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Research
              </Link>
              <Link 
                to="/therapy" 
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Therapy Guides
              </Link>
              <Link 
                to="/infographics" 
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Infographics
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredResults.map((result) => (
              <article 
                key={result.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
              >
                <div className="md:flex">
                  <div className="md:w-1/4">
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="md:w-3/4 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(result.type)}`}>
                        {result.type}
                      </span>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{result.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{result.readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {result.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {result.excerpt}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;