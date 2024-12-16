import { useState, useEffect } from 'react';
import { mediaService, MEDIA_SIZES } from './mediaService';

export interface StreamingNewsItem {
  id: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
  image: string;
  videoId?: string;
  source: string;
}

const STREAMING_RSS_FEEDS = [
  {
    url: 'https://www.twitch.tv/directory/game/Just%20Chatting/clips.rss',
    source: 'Twitch Just Chatting'
  },
  {
    url: 'https://www.twitch.tv/directory/game/Counter-Strike%202/clips.rss',
    source: 'Twitch CS2'
  },
  {
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCbLj9QP9FAaHs_647QckGtA',
    source: 'Twitch Highlights'
  },
  {
    url: 'https://www.thegamer.com/feed/streaming/news/',
    source: 'The Gamer'
  }
];

const extractVideoId = (url: string): string | undefined => {
  try {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      return videoId;
    }
    if (url.includes('twitch.tv')) {
      const clipId = url.match(/twitch\.tv\/\w+\/clip\/(\w+)/)?.[1];
      return clipId;
    }
  } catch (error) {
    console.error('Error extracting video ID:', error);
  }
  return undefined;
};

const extractImage = async (content: string): Promise<string> => {
  try {
    // Try to find image in content
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch?.[1]) {
      return mediaService.processImageUrl(imgMatch[1], MEDIA_SIZES.card);
    }

    // Try to find video thumbnail
    const videoMatch = content.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (videoMatch?.[1]) {
      return mediaService.processImageUrl(`https://img.youtube.com/vi/${videoMatch[1]}/maxresdefault.jpg`, MEDIA_SIZES.card);
    }

    // Try to find Twitch clip thumbnail
    const twitchMatch = content.match(/twitch\.tv\/\w+\/clip\/(\w+)/);
    if (twitchMatch?.[1]) {
      // Note: You'll need to implement Twitch API call to get the actual thumbnail
      return `https://clips-media-assets2.twitch.tv/${twitchMatch[1]}-preview-480x272.jpg`;
    }
  } catch (error) {
    console.error('Error extracting image:', error);
  }

  return mediaService.processImageUrl('', MEDIA_SIZES.card);
};

const parseRSSFeed = async (feed: string, source: string): Promise<StreamingNewsItem[]> => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(feed, 'text/xml');
    const items = xmlDoc.querySelectorAll('item');

    const parsedItems = await Promise.all(Array.from(items).map(async (item, index) => {
      const title = item.querySelector('title')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      const content = item.querySelector('content:encoded')?.textContent || description;

      const image = await extractImage(content);
      const videoId = extractVideoId(link);

      return {
        id: `${source}-${index}`,
        title,
        link,
        description: description.replace(/<[^>]*>/g, ''),
        pubDate,
        image,
        videoId,
        source
      };
    }));

    return parsedItems;
  } catch (error) {
    console.error(`Error parsing RSS feed from ${source}:`, error);
    return [];
  }
};

export const getStreamingNews = async (): Promise<StreamingNewsItem[]> => {
  try {
    const allNews: StreamingNewsItem[] = [];

    await Promise.all(STREAMING_RSS_FEEDS.map(async ({ url, source }) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const feed = await response.text();
        const items = await parseRSSFeed(feed, source);
        allNews.push(...items);
      } catch (error) {
        console.error(`Error fetching RSS feed from ${source}:`, error);
      }
    }));

    // Sort by date
    return allNews.sort((a, b) => 
      new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
  } catch (error) {
    console.error('Error getting streaming news:', error);
    return [];
  }
};

export const useStreamingNews = () => {
  const [news, setNews] = useState<StreamingNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await getStreamingNews();
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
