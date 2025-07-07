import React from 'react';
import { Brain, ArrowLeft, BookOpen, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const therapyGuides = [
  {
    id: 1,
    title: "Introduction to Therapy Techniques #3: EMDR and Trauma Processing",
    excerpt: "Understanding Eye Movement Desensitization and Reprocessing and its effectiveness in treating PTSD and trauma-related disorders.",
    date: "Dec 10, 2024",
    image: "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "EMDR",
    readTime: "12 min read",
    difficulty: "Intermediate"
  },
  {
    id: 2,
    title: "Therapy Techniques #2: Dialectical Behavior Therapy Skills",
    excerpt: "Learning distress tolerance, emotion regulation, and interpersonal effectiveness skills from DBT for everyday life.",
    date: "Dec 5, 2024",
    image: "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "DBT",
    readTime: "15 min read",
    difficulty: "Beginner"
  },
  {
    id: 3,
    title: "Therapy Techniques #1: Understanding CBT Fundamentals",
    excerpt: "An introduction to cognitive behavioral therapy and how thoughts, feelings, and behaviors are interconnected.",
    date: "Nov 28, 2024",
    image: "https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "CBT",
    readTime: "10 min read",
    difficulty: "Beginner"
  },
  {
    id: 4,
    title: "Mental Health Milestones #4 — Building Resilience",
    excerpt: "Developing psychological resilience through evidence-based practices and mindset shifts for long-term wellbeing.",
    date: "Nov 20, 2024",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Resilience",
    readTime: "8 min read",
    difficulty: "Intermediate"
  },
  {
    id: 5,
    title: "Understanding Attachment Styles in Therapy",
    excerpt: "How attachment theory informs therapeutic relationships and personal growth in various therapeutic modalities.",
    date: "Nov 15, 2024",
    image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Attachment",
    readTime: "11 min read",
    difficulty: "Advanced"
  },
  {
    id: 6,
    title: "Mindfulness-Based Stress Reduction Techniques",
    excerpt: "Practical MBSR exercises and techniques for managing stress, anxiety, and improving overall mental wellness.",
    date: "Nov 10, 2024",
    image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Mindfulness",
    readTime: "9 min read",
    difficulty: "Beginner"
  },
  {
    id: 7,
    title: "Acceptance and Commitment Therapy (ACT) Principles",
    excerpt: "Learning to accept difficult thoughts and feelings while committing to values-based action for psychological flexibility.",
    date: "Nov 5, 2024",
    image: "https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "ACT",
    readTime: "13 min read",
    difficulty: "Intermediate"
  },
  {
    id: 8,
    title: "Family Systems Therapy: Understanding Dynamics",
    excerpt: "How family patterns and relationships impact individual mental health and therapeutic interventions for families.",
    date: "Oct 30, 2024",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Family Therapy",
    readTime: "14 min read",
    difficulty: "Advanced"
  },
  {
    id: 9,
    title: "Somatic Therapy: Healing Through the Body",
    excerpt: "Understanding how trauma is stored in the body and using somatic approaches for healing and recovery.",
    date: "Oct 25, 2024",
    image: "https://images.pexels.com/photos/3771115/pexels-photo-3771115.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Somatic",
    readTime: "12 min read",
    difficulty: "Intermediate"
  },
  {
    id: 10,
    title: "Narrative Therapy: Rewriting Your Story",
    excerpt: "How to externalize problems and re-author your life story through narrative therapeutic techniques.",
    date: "Oct 20, 2024",
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Narrative",
    readTime: "10 min read",
    difficulty: "Beginner"
  },
  {
    id: 11,
    title: "Gestalt Therapy: Present-Moment Awareness",
    excerpt: "Exploring Gestalt principles of here-and-now awareness and contact for personal growth and healing.",
    date: "Oct 15, 2024",
    image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Gestalt",
    readTime: "11 min read",
    difficulty: "Advanced"
  },
  {
    id: 12,
    title: "Solution-Focused Brief Therapy Techniques",
    excerpt: "Goal-oriented therapeutic approach focusing on solutions rather than problems for rapid positive change.",
    date: "Oct 10, 2024",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "SFBT",
    readTime: "9 min read",
    difficulty: "Beginner"
  }
];

const categories = [
  { name: "All", icon: BookOpen, count: therapyGuides.length },
  { name: "CBT", icon: Brain, count: 1 },
  { name: "DBT", icon: Heart, count: 1 },
  { name: "EMDR", icon: Users, count: 1 },
  { name: "Mindfulness", icon: BookOpen, count: 1 }
];

const TherapyPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredGuides = selectedCategory === 'All' 
    ? therapyGuides 
    : therapyGuides.filter(guide => guide.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
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
            <Brain className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Therapy Guides</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            Comprehensive guides to therapeutic techniques, mental health strategies, 
            and evidence-based approaches for personal growth and healing.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.name
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.name
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Therapy Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide) => (
            <article 
              key={guide.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    {guide.category}
                  </span>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(guide.difficulty)}`}>
                    {guide.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {guide.title}
                </h3>
                
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {guide.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{guide.date}</span>
                  <span>{guide.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
            Load More Guides
          </button>
        </div>
      </div>
    </div>
  );
};

export default TherapyPage;