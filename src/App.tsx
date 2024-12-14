import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import CategoryPage from './pages/CategoryPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import Subscription from './pages/Subscription';
import GamingNews from './pages/blogs/GamingNews';
import GameReviews from './pages/blogs/GameReviews';
import Esports from './pages/blogs/Esports';
import GamingTips from './pages/blogs/GamingTips';
import TechGuides from './pages/blogs/TechGuides';
import ModdingCustomization from './pages/blogs/ModdingCustomization';
import GamingCulture from './pages/blogs/GamingCulture';
import IndustryInsights from './pages/blogs/IndustryInsights';
import GameReleases from './pages/blogs/GameReleases';
import TechReview from './pages/blogs/TechReview';
import CryptoNews from './pages/blogs/CryptoNews';
import EsportsNews from './pages/blogs/EsportsNews';
import TechNews from './pages/blogs/TechNews';

function App() {
  return (
    <SubscriptionProvider>
      <Router>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#1F2937',
              color: '#fff',
            },
          }}
        />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/blog/:blogId" element={<BlogPage />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blogs/gaming-news" element={<GamingNews />} />
            <Route path="/blogs/esports-news" element={<EsportsNews />} />
            <Route path="/blogs/tech-news" element={<TechNews />} />
            <Route path="/blogs/crypto-news" element={<CryptoNews />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </SubscriptionProvider>
  );
}

export default App;