import React from 'react';
import { Route } from 'react-router-dom';
import GamingNews from '../pages/blogs/GamingNews';
import EsportsNews from '../pages/blogs/EsportsNews';
import TechNews from '../pages/blogs/TechNews';
import CryptoNews from '../pages/blogs/CryptoNews';
import TopGamingPodcasts from '../pages/TopGamingPodcasts';
import TopCryptoPodcasts from '../pages/TopCryptoPodcasts';
import TopTechPodcasts from '../pages/TopTechPodcasts';

export const blogRoutes = [
  <Route key="gaming" path="/blogs/gaming-news" element={<GamingNews />} />,
  <Route key="esports" path="/blogs/esports-news" element={<EsportsNews />} />,
  <Route key="tech" path="/blogs/tech-news" element={<TechNews />} />,
  <Route key="crypto" path="/blogs/crypto-news" element={<CryptoNews />} />,
  <Route key="gaming-podcasts" path="/podcasts/gaming" element={<TopGamingPodcasts />} />,
  <Route key="crypto-podcasts" path="/podcasts/crypto" element={<TopCryptoPodcasts />} />,
  <Route key="tech-podcasts" path="/podcasts/tech" element={<TopTechPodcasts />} />
];
