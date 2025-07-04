import React from 'react';
import { BarChart3, ArrowLeft, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const infographics = [
  {
    id: 1,
    title: "Mental Health Statistics Worldwide",
    date: "Dec 8, 2024",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Statistics",
    description: "A comprehensive overview of global mental health statistics, prevalence rates, and treatment accessibility across different regions."
  },
  {
    id: 2,
    title: "The Psychology of Color and Mood",
    date: "Dec 1, 2024",
    image: "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Color Psychology",
    description: "How different colors affect our emotions, behavior, and psychological well-being in various environments."
  },
  {
    id: 3,
    title: "Sleep Stages and Mental Health",
    date: "Nov 25, 2024",
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Sleep Science",
    description: "Understanding the relationship between sleep cycles, REM stages, and their impact on mental health and cognitive function."
  },
  {
    id: 4,
    title: "Anxiety Disorders: Types and Symptoms",
    date: "Nov 20, 2024",
    image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Mental Health",
    description: "A visual guide to different types of anxiety disorders, their symptoms, and prevalence in various age groups."
  },
  {
    id: 5,
    title: "Cognitive Biases in Decision Making",
    date: "Nov 15, 2024",
    image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Cognitive Psychology",
    description: "Common cognitive biases that affect our daily decisions and how to recognize them in personal and professional contexts."
  },
  {
    id: 6,
    title: "The Neuroscience of Emotions",
    date: "Nov 10, 2024",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Neuroscience",
    description: "Brain regions involved in emotional processing and how different emotions manifest in neural activity patterns."
  },
  {
    id: 7,
    title: "Stress Response System",
    date: "Nov 5, 2024",
    image: "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Stress Management",
    description: "How the body's stress response system works, from initial trigger to physiological and psychological effects."
  },
  {
    id: 8,
    title: "Therapy Modalities Comparison",
    date: "Oct 30, 2024",
    image: "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Therapy",
    description: "Comparing different therapeutic approaches including CBT, DBT, EMDR, and their effectiveness for various conditions."
  },
  {
    id: 9,
    title: "Social Media and Mental Health",
    date: "Oct 25, 2024",
    image: "https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Digital Wellness",
    description: "The impact of social media usage on mental health, including both positive and negative effects across age groups."
  },
  {
    id: 10,
    title: "Depression Symptoms and Warning Signs",
    date: "Oct 20, 2024",
    image: "https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Mental Health",
    description: "Visual guide to recognizing depression symptoms, risk factors, and when to seek professional help."
  },
  {
    id: 11,
    title: "Memory Formation and Retrieval",
    date: "Oct 15, 2024",
    image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Neuroscience",
    description: "How memories are formed, stored, and retrieved in the brain, including factors that affect memory performance."
  },
  {
    id: 12,
    title: "Workplace Mental Health Statistics",
    date: "Oct 10, 2024",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Statistics",
    description: "Data on mental health challenges in the workplace, burnout rates, and the economic impact of mental health issues."
  },
  {
    id: 13,
    title: "Child Development Milestones",
    date: "Oct 5, 2024",
    image: "https://images.pexels.com/photos/3771115/pexels-photo-3771115.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Developmental Psychology",
    description: "Key psychological and cognitive development milestones from infancy through adolescence."
  },
  {
    id: 14,
    title: "Addiction and the Brain",
    date: "Sep 30, 2024",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Neuroscience",
    description: "How addiction affects brain structure and function, including the neurobiology of substance use disorders."
  },
  {
    id: 15,
    title: "Mindfulness Benefits Visualization",
    date: "Sep 25, 2024",
    image: "https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Mindfulness",
    description: "Visual representation of mindfulness benefits for mental health, stress reduction, and cognitive performance."
  }
];

const categories = [
  "All",
  "Statistics",
  "Mental Health",
  "Neuroscience",
  "Therapy",
  "Sleep Science",
  "Color Psychology",
  "Cognitive Psychology",
  "Stress Management",
  "Digital Wellness",
  "Developmental Psychology",
  "Mindfulness"
];

const InfographicsPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredInfographics = selectedCategory === 'All' 
    ? infographics 
    : infographics.filter(infographic => infographic.category === selectedCategory);

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
            <BarChart3 className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Infographics</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            Visual representations of psychological concepts, research findings, and mental health data 
            designed to make complex information accessible and engaging.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Infographics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInfographics.map((infographic) => (
            <article 
              key={infographic.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={infographic.image}
                  alt={infographic.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                      <Download className="w-5 h-5 text-gray-700" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                      <Share2 className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    {infographic.category}
                  </span>
                  <span className="text-sm text-gray-500">{infographic.date}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {infographic.title}
                </h3>
                
                <p className="text-gray-600 text-sm line-clamp-3">
                  {infographic.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
            Load More Infographics
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfographicsPage;