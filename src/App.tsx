import MindfulnessBingo from './pages/mindfulness-bingo';
import MonthlyChallenge from './pages/monthly-challenge';
import Research1 from './pages/research-1';
import Research2 from './pages/research-2';
import Research3 from './pages/research-3';
import TopArticle1 from './pages/top-article-1';
import TopArticle2 from './pages/top-article-2';
import TopArticle3 from './pages/top-article-3';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import DailySection from './components/DailySection';
import ResearchSection from './components/ResearchSection';
// import Newsletter from './components/Newsletter';
import WellnessPlan from './pages/wellness-plan';
import InfographicsSection from './components/InfographicsSection';
import Footer from './components/Footer';
import DailyPsychoPage from './pages/daily-psycho';
import DailyCBTPage from './pages/daily-cbt';
import DailyMindfulnessPage from './pages/daily-mindfulness';
import DailyHabitsPage from './pages/daily-habits';
import DailySocialPage from './pages/daily-social';
import Login from './pages/Login';
import Register from './pages/Register';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import NewsletterSection from './components/NewsletterSection';
import FloatingActionButton from './components/FloatingActionButton';
import QuickAccessBar from './components/QuickAccessBar';
import ReadingProgressBar from './components/ReadingProgressBar';
import { AuthProvider } from './contexts/AuthContext';
import ArticleDetail from './pages/ArticleDetail';
import Articles from './pages/Articles';

// Home page component
const HomePage = () => (
  <>
    <Hero />
    <Features />
    <DailySection />
    <ResearchSection />
    <Testimonials />
    <NewsletterSection />
  </>
);


import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Reset all wellness plan/trial/progress state on every page load
    import('./utils/resetApp').then(mod => {
      mod.resetAppState();
    });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <ReadingProgressBar />
          <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/daily" element={<DailySection />} />
          <Route path="/research" element={<ResearchSection />} />
          <Route path="/newsletter" element={<NewsletterSection />} />
          <Route path="/money" element={<WellnessPlan />} />
          <Route path="/wellness-plan" element={<WellnessPlan />} />
          <Route path="/mindfulness-bingo" element={<MindfulnessBingo />} />
          <Route path="/monthly-challenge" element={<MonthlyChallenge />} />
          <Route path="/infographics" element={<InfographicsSection />} />
          <Route path="/pages/daily-psycho" element={<DailyPsychoPage />} />
          <Route path="/pages/daily-cbt" element={<DailyCBTPage />} />
          <Route path="/pages/daily-mindfulness" element={<DailyMindfulnessPage />} />
          <Route path="/pages/daily-habits" element={<DailyHabitsPage />} />
          <Route path="/pages/daily-social" element={<DailySocialPage />} />
          <Route path="/pages/research-1" element={<Research1 />} />
          <Route path="/pages/research-2" element={<Research2 />} />
          <Route path="/pages/research-3" element={<Research3 />} />
          <Route path="/pages/top-article-1" element={<TopArticle1 />} />
          <Route path="/pages/top-article-2" element={<TopArticle2 />} />
          <Route path="/pages/top-article-3" element={<TopArticle3 />} />
        </Routes>
        <Footer />
        <FloatingActionButton />
        <QuickAccessBar />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;