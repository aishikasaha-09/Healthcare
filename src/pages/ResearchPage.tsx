import React from 'react';
import { TrendingUp, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const researchArticles = [
  {
    id: 1,
    title: "Latest Breakthrough in Depression Treatment",
    excerpt: "New research reveals promising results for ketamine-assisted therapy in treatment-resistant depression, showing significant improvement in 70% of participants.",
    date: "Dec 15, 2024",
    image: "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=600",
    journal: "Nature Neuroscience",
    authors: "Dr. Sarah Johnson et al.",
    category: "Clinical Research"
  },
  {
    id: 2,
    title: "The Neuroscience of Learning and Memory",
    excerpt: "Recent studies show how sleep and exercise enhance neuroplasticity and cognitive performance, with implications for educational practices.",
    date: "Dec 14, 2024",
    image: "https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=600",
    journal: "Science",
    authors: "Dr. Michael Chen et al.",
    category: "Neuroscience"
  },
  {
    id: 3,
    title: "Understanding Autism Spectrum Disorders",
    excerpt: "New diagnostic tools and therapeutic approaches are improving outcomes for individuals with ASD, focusing on early intervention strategies.",
    date: "Dec 13, 2024",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    journal: "Journal of Autism Research",
    authors: "Dr. Emily Rodriguez et al.",
    category: "Developmental Psychology"
  },
  {
    id: 4,
    title: "Social Media's Impact on Adolescent Mental Health",
    excerpt: "Longitudinal study reveals complex relationships between social media use and mental health outcomes in teenagers.",
    date: "Dec 12, 2024",
    image: "https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=600",
    journal: "Psychological Science",
    authors: "Dr. Alex Thompson et al.",
    category: "Social Psychology"
  },
  {
    id: 5,
    title: "Mindfulness-Based Interventions for Anxiety",
    excerpt: "Meta-analysis of 50 studies confirms effectiveness of mindfulness-based cognitive therapy for anxiety disorders.",
    date: "Dec 11, 2024",
    image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600",
    journal: "Clinical Psychology Review",
    authors: "Dr. Lisa Park et al.",
    category: "Clinical Research"
  },
  {
    id: 6,
    title: "The Psychology of Decision Making Under Stress",
    excerpt: "New insights into how stress affects cognitive processes and decision-making abilities in high-pressure situations.",
    date: "Dec 10, 2024",
    image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=600",
    journal: "Cognitive Psychology",
    authors: "Dr. Robert Kim et al.",
    category: "Cognitive Psychology"
  },
  {
    id: 7,
    title: "Breakthrough in PTSD Treatment Research",
    excerpt: "Novel combination therapy shows 85% success rate in treating post-traumatic stress disorder in veterans.",
    date: "Dec 9, 2024",
    image: "https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg?auto=compress&cs=tinysrgb&w=600",
    journal: "American Journal of Psychiatry",
    authors: "Dr. Maria Santos et al.",
    category: "Trauma Research"
  },
  {
    id: 8,
    title: "Genetic Markers for Bipolar Disorder Identified",
    excerpt: "Large-scale genome study identifies new genetic variants associated with bipolar disorder, opening doors for personalized treatment.",
    date: "Dec 8, 2024",
    image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=600",
    journal: "Nature Genetics",
    authors: "Dr. James Wilson et al.",
    category: "Genetics"
  },
  {
    id: 9,
    title: "Sleep Deprivation and Cognitive Function",
    excerpt: "Comprehensive study reveals how even mild sleep deprivation significantly impacts memory consolidation and executive function.",
    date: "Dec 7, 2024",
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=600",
    journal: "Sleep Medicine Reviews",
    authors: "Dr. Anna Foster et al.",
    category: "Sleep Research"
  },
  {
    id: 10,
    title: "Virtual Reality Therapy for Phobias",
    excerpt: "Randomized controlled trial demonstrates VR exposure therapy's effectiveness in treating specific phobias with 90% success rate.",
    date: "Dec 6, 2024",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    journal: "Behavior Research and Therapy",
    authors: "Dr. David Chang et al.",
    category: "Technology & Psychology"
  }
];

const ResearchPage = () => {
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
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Research Insights</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            Stay updated with the latest psychological research, breakthrough studies, 
            and evidence-based findings from leading journals and institutions worldwide.
          </p>
        </div>
      </div>

      {/* Research Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {researchArticles.map((article) => (
            <article 
              key={article.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">{article.date}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900">
                        Published in: {article.journal}
                      </p>
                      <p className="text-sm text-gray-600">
                        Authors: {article.authors}
                      </p>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      <span>Read Study</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
            Load More Research
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResearchPage;