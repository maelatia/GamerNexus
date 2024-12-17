import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Article, loadArticles } from '../../services/articleService';

export default function BlogArticle() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await loadArticles();
        console.log('Loaded articles:', data);
        setArticles(data);
        if (articleId) {
          const index = data.findIndex(a => a.slug === articleId);
          console.log('Found article index:', index, 'for slug:', articleId);
          if (index !== -1) {
            setCurrentIndex(index);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading articles:', error);
        setLoading(false);
      }
    };
    fetchArticles();
  }, [articleId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  const currentArticle = articles[currentIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 text-white w-full min-h-screen bg-gray-900">
      {/* Hero Section Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 w-full">
        <div className="bg-[#1E2837] mb-6 rounded-xl">
          <div className="relative h-[700px] w-full">
            <img 
              src={currentArticle.image}
              alt={currentArticle.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/default-article.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E2837] via-[#1E2837]/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 w-full">
              <div className="w-full">
                <div className="flex items-center space-x-4 mb-4 w-full">
                  <img 
                    src={currentArticle.author.avatar}
                    alt={currentArticle.author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/default-avatar.jpg';
                    }}
                  />
                  <div>
                    <h3 className="font-medium text-white">{currentArticle.author.name}</h3>
                    <div className="flex items-center text-sm text-gray-300 space-x-2 w-full">
                      <span>{currentArticle.date}</span>
                      <span>•</span>
                      <span>{currentArticle.readTime}</span>
                      <span>•</span>
                      <span className="text-blue-400">{currentArticle.collection}</span>
                    </div>
                  </div>
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold text-white mb-2 leading-tight w-full">{currentArticle.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          {/* Main Article Content */}
          <div className="lg:col-span-8">
            <article className="bg-[#1E2837] rounded-xl shadow-lg">
              <div className="p-6 lg:p-8">
                <div className="mx-auto" style={{ maxWidth: '650px' }}>
                  <div 
                    className="article-content"
                    dangerouslySetInnerHTML={{ 
                      __html: currentArticle.content
                        .replace(/<h2/g, '<h2 class="text-4xl font-bold mb-8 mt-8 text-white font-Riosark"')
                        .replace(/<h3/g, '<h3 class="text-2xl font-semibold mb-6 mt-6 text-white font-Nexa"')
                        .replace(/<p/g, '<p class="text-lg text-gray-300 mb-6 leading-relaxed font-Nexa"')
                        .replace(/<ul/g, '<ul class="list-disc list-inside mb-6 text-gray-300 space-y-2 font-Nexa pl-4"')
                        .replace(/<li/g, '<li class="mb-2 text-gray-300 font-Nexa"')
                        .replace(/<em/g, '<em class="text-gray-300 italic font-Nexa"')
                        .replace(/<strong/g, '<strong class="font-semibold text-white"')
                        .replace(/<a /g, '<a class="text-blue-400 hover:text-blue-300" ')
                    }}
                  />
                </div>
              </div>
            </article>
          </div>

          {/* Article List Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-4 bg-[#1E2837] rounded-xl shadow-lg">
              {/* Articles List */}
              <div className="p-4 w-full">
                <div className="space-y-4 w-full">
                  {articles.map((article, index) => (
                    <button
                      key={article.id}
                      onClick={() => {
                        setCurrentIndex(articles.findIndex(a => a.id === article.id));
                        navigate(`/blog/${article.slug}`);
                      }}
                      className={`block w-full text-left transition-colors ${
                        currentArticle.id === article.id
                          ? 'bg-[#2A3441]'
                          : 'hover:bg-[#2A3441]'
                      } rounded-lg`}
                    >
                      <div className="relative w-full">
                        <div className="aspect-[16/9] w-full">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/default-article.jpg';
                            }}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 w-full">
                          <div className="flex items-center space-x-2 mb-2 w-full">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded">
                              {article.collection}
                            </span>
                            <span className="text-xs text-gray-300">{article.date}</span>
                          </div>
                          <h3 className="text-sm font-medium text-white line-clamp-2 w-full">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* See More Link */}
                <div className="mt-6 text-center w-full">
                  <button 
                    onClick={() => navigate('/blog')}
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium w-full"
                  >
                    See more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
