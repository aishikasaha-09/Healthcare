import React from 'react';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: "The Science Behind Cognitive Behavioral Therapy",
    excerpt: "Understanding how CBT works and why it's one of the most effective treatments for anxiety and depression. This comprehensive guide explores the mechanisms behind cognitive restructuring and behavioral activation.",
    date: "Dec 15, 2024",
    image: "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=600",
    readTime: "8 min read",
    category: "Therapy"
  },
  {
    id: 2,
    title: "Understanding Mindfulness and Its Mental Health Benefits",
    excerpt: "How mindfulness meditation can rewire your brain for better emotional regulation and stress management. Learn about the neuroscience behind mindfulness practices.",
    date: "Dec 14, 2024",
    image: "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=600",
    readTime: "6 min read",
    category: "Wellness"
  },
  {
    id: 3,
    title: "The Psychology of Habit Formation",
    excerpt: "Discover the neuroscience behind habits and evidence-based strategies for building positive behaviors that stick long-term.",
    date: "Dec 13, 2024",
    image: "https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=600",
    readTime: "7 min read",
    category: "Behavioral Science"
  },
  {
    id: 4,
    title: "Social Psychology: How Groups Influence Behavior",
    excerpt: "Exploring conformity, social proof, and group dynamics in modern society and their impact on individual decision-making.",
    date: "Dec 12, 2024",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    readTime: "5 min read",
    category: "Social Psychology"
  },
  {
    id: 5,
    title: "Understanding Emotional Intelligence in Relationships",
    excerpt: "How emotional intelligence affects our relationships and practical strategies for improving emotional awareness and regulation.",
    date: "Dec 11, 2024",
    image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=600",
    readTime: "6 min read",
    category: "Relationships"
  },
  {
    id: 6,
    title: "The Neuroscience of Learning and Memory",
    excerpt: "Recent discoveries about how our brains form, store, and retrieve memories, and what this means for effective learning strategies.",
    date: "Dec 10, 2024",
    image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600",
    readTime: "9 min read",
    category: "Neuroscience"
  },
  {
    id: 7,
    title: "Breaking Down Mental Health Stigma in the Workplace",
    excerpt: "How organizations can create supportive environments for mental health and why psychological safety matters for productivity.",
    date: "Dec 9, 2024",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    readTime: "7 min read",
    category: "Workplace Psychology"
  },
  {
    id: 8,
    title: "The Psychology of Decision Making Under Pressure",
    excerpt: "Understanding how stress affects our cognitive processes and learning strategies to make better decisions in high-pressure situations.",
    date: "Dec 8, 2024",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600",
    readTime: "8 min read",
    category: "Cognitive Psychology"
  },
  {
    id: 9,
    title: "Sleep Psychology: How Rest Affects Mental Health",
    excerpt: "The bidirectional relationship between sleep and mental health, plus evidence-based strategies for improving sleep hygiene.",
    date: "Dec 7, 2024",
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=600",
    readTime: "6 min read",
    category: "Sleep Science"
  },
  {
    id: 10,
    title: "Understanding Anxiety Disorders: Types and Treatment",
    excerpt: "A comprehensive overview of different anxiety disorders, their symptoms, and evidence-based treatment approaches.",
    date: "Dec 6, 2024",
    image: "https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg?auto=compress&cs=tinysrgb&w=600",
    readTime: "10 min read",
    category: "Mental Health"
  },
  {
    id: 11,
    title: "The Role of Genetics in Mental Health",
    excerpt: "How genetic factors contribute to mental health conditions and the importance of gene-environment interactions.",
    date: "Dec 5, 2024",
    image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=600",
    readTime: "8 min read",
    category: "Genetics"
  },
  {
    id: 12,
    title: "Positive Psychology: The Science of Happiness",
    excerpt: "Exploring what makes life worth living and evidence-based practices for increasing well-being and life satisfaction.",
    date: "Dec 4, 2024",
    image: "https://images.pexels.com/photos/3771115/pexels-photo-3771115.jpeg?auto=compress&cs=tinysrgb&w=600",
    readTime: "7 min read",
    category: "Positive Psychology"
  }
];

const DailyPage = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Daily Psychology</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Your daily dose of psychology insights, research findings, and practical applications 
            for better mental health and understanding human behavior.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article 
              key={article.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    {article.category}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyPage;