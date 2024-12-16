import { useState, useEffect } from 'react';

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  image: string;
  description: string;
  date: string;
  source: string;
  videoId?: string;
}

const processImageUrl = (url: string): string => {
  if (!url) {
    return 'https://placehold.co/750x400/1a1a1a/purple?text=No+Image';
  }

  // Handle YouTube thumbnails and embeds
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    try {
      let videoId = '';
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split(/[?#]/)[0];
      } else if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        videoId = urlParams.get('v') || '';
      } else if (url.includes('/vi/') || url.includes('/embed/')) {
        videoId = url.split(/\/vi\/|\/embed\//)[1].split('/')[0];
      }

      if (videoId) {
        // Try the highest quality thumbnail first
        return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      }
    } catch (e) {
      console.error('Error processing YouTube URL:', e);
    }
  }

  // Handle HLTV images
  if (url.includes('img-cdn.hltv.org')) {
    try {
      const urlObj = new URL(url);
      // Keep the base URL and essential parameters
      const baseUrl = urlObj.origin + urlObj.pathname;
      const params = new URLSearchParams();
      
      // Only keep necessary parameters
      ['w', 'mark', 'mark-w', 'mark-h'].forEach(param => {
        if (urlObj.searchParams.has(param)) {
          params.set(param, urlObj.searchParams.get(param)!);
        }
      });

      return `${baseUrl}?${params.toString()}`;
    } catch (e) {
      console.error('Error processing HLTV URL:', e);
    }
  }

  // Handle lite-youtube elements
  if (url.includes('lite-youtube')) {
    try {
      const videoId = url.match(/videoid="([^"]+)"/)?.[1];
      if (videoId) {
        return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      }
    } catch (e) {
      console.error('Error processing lite-youtube element:', e);
    }
  }

  // Return original URL if no processing needed or if processing failed
  return url;
};

export const getNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch('/Scrapping/news/news.csv');
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    const lines = text.split('\n').filter(line => line.trim());
    
    // Skip header row
    const dataLines = lines.slice(1);
    
    return dataLines.map((line, index) => {
      const [title, link, image, description, date, source] = line.split(',').map(field => 
        field.trim().replace(/^"|"$/g, '')
      );

      // Process the image URL
      const processedImage = processImageUrl(image);

      // Extract video ID if it's a YouTube URL
      let videoId: string | undefined;
      if (image.includes('youtube.com') || image.includes('youtu.be')) {
        try {
          if (image.includes('youtu.be/')) {
            videoId = image.split('youtu.be/')[1].split(/[?#]/)[0];
          } else if (image.includes('youtube.com/watch')) {
            const urlParams = new URLSearchParams(image.split('?')[1]);
            videoId = urlParams.get('v') || undefined;
          }
        } catch (e) {
          console.error('Error extracting video ID:', e);
        }
      }

      return {
        id: String(index + 1),
        title,
        link,
        image: processedImage,
        description,
        date,
        source,
        videoId
      };
    });
  } catch (error) {
    console.error('Error loading news:', error);
    return [];
  }
};

export const useNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await getNews();
        setNews(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return { news, loading, error };
};
