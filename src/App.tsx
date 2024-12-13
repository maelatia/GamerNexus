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
            <Route path="*" element={<NotFoundPage />} />
            
            {/* Blog Routes */}
            <Route path="/blogs/gaming-news" element={<GamingNews />} />
            <Route path="/blogs/game-reviews" element={<GameReviews />} />
            <Route path="/blogs/esports" element={<Esports />} />
            <Route path="/blogs/gaming-tips" element={<GamingTips />} />
            <Route path="/blogs/tech-guides" element={<TechGuides />} />
            <Route path="/blogs/modding" element={<ModdingCustomization />} />
            <Route path="/blogs/culture" element={<GamingCulture />} />
            <Route path="/blogs/industry" element={<IndustryInsights />} />
            <Route path="/blogs/releases" element={<GameReleases />} />
            <Route path="/blogs/tech-review" element={<TechReview />} />
            <Route path="/blogs/crypto" element={<CryptoNews />} />
          </Routes>
        </Layout>
      </Router>
    </SubscriptionProvider>
  );
}

export default App;