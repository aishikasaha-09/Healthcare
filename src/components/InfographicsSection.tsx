import React from 'react';
import { ArrowRight, BarChart3 } from 'lucide-react';

const infographics = [
  {
    id: 1,
    title: "Mental Health Statistics Worldwide",
    date: "Dec 8, 2024",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 2,
    title: "The Psychology of Color and Mood",
    date: "Dec 1, 2024",
    image: "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 3,
    title: "Sleep Stages and Mental Health",
    date: "Nov 25, 2024",
    image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

const InfographicsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            <span>Infographics</span>
          </h2>
          <a 
            href="/infographics" 
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            <span>See all</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {infographics.map((infographic) => (
            <article 
              key={infographic.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={infographic.image}
                  alt={infographic.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {infographic.date}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {infographic.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfographicsSection;