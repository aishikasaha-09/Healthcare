import React from 'react';
import Hero from '../components/Hero';
import DailySection from '../components/DailySection';
import ResearchSection from '../components/ResearchSection';
import Newsletter from '../components/Newsletter';
import MoneySection from '../components/MoneySection';
import InfographicsSection from '../components/InfographicsSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <DailySection />
      <ResearchSection />
      <Newsletter />
      <MoneySection />
      <InfographicsSection />
    </>
  );
};

export default HomePage;