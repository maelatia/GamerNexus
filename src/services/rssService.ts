import axios from 'axios';

export interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  author?: string;
  categories: string[];
  image?: string;
  source?: string;
}

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// Cache for RSS feeds
const RSS_CACHE: { [key: string]: { data: RSSItem[]; timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

const extractImageUrl = (content: string): string | undefined => {
  // Try to find video thumbnail first (including YouTube and tech review sites)
  const videoThumbnailMatch = 
    content.match(/https?:\/\/img\.youtube\.com\/vi\/[^/]+\/maxresdefault\.jpg/i) ||
    content.match(/<media:thumbnail[^>]+url="([^"]+)"[^>]*>/i) ||
    content.match(/<yt:thumbnail[^>]+url="([^"]+)"[^>]*>/i) ||
    content.match(/https?:\/\/i\.ytimg\.com\/vi\/[^/]+\/[^"'\s]+/i);
  if (videoThumbnailMatch) return videoThumbnailMatch[1] || videoThumbnailMatch[0];

  // Try to find image in media:content
  const mediaMatch = 
    content.match(/<media:content[^>]+medium="image"[^>]+url="([^"]+)"[^>]*>/i) ||
    content.match(/<media:content[^>]+url="([^"]+)"[^>]+type="image\/[^"]+"[^>]*>/i) ||
    content.match(/<media:content[^>]+url="([^"]+)"[^>]*>/i) ||
    content.match(/<media:content[^>]+>.*?<media:thumbnail[^>]+url="([^"]+)"[^>]*>/i);
  if (mediaMatch) return mediaMatch[1];

  // Try to find image in enclosure
  const enclosureMatch = 
    content.match(/<enclosure[^>]+type="image\/[^"]+"[^>]+url="([^"]+)"[^>]*>/i) ||
    content.match(/<enclosure[^>]+url="([^"]+)"[^>]*>/i);
  if (enclosureMatch) return enclosureMatch[1];

  // Try to find image in og:image meta tag
  const ogImageMatch = content.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"[^>]*>/i);
  if (ogImageMatch) return ogImageMatch[1];

  // Try to find first img tag with src
  const imgMatch = content.match(/<img[^>]+src="([^"]+(?:jpg|jpeg|png|gif|webp))"[^>]*>/i);
  if (imgMatch) return imgMatch[1];

  // Try to find image URL in the content
  const urlMatch = content.match(/https?:\/\/[^"\s]+?\.(?:jpg|jpeg|gif|png|webp)/i);
  if (urlMatch) return urlMatch[0];

  return undefined;
};

const extractTechNewsImage = (content: string): string | undefined => {
  // Try to find high-quality tech review images first
  const techImageMatch = content.match(/https?:\/\/[^"\s]+?[-_](hero|review|main|header|feature)[^"\s]*\.(?:jpg|jpeg|png|webp)/i);
  if (techImageMatch) return techImageMatch[0];

  return extractImageUrl(content);
};

const getElementText = (element: Element, selector: string): string => {
  const el = element.querySelector(selector);
  return el?.textContent?.trim() || '';
};

const fetchRSSFeed = async (url: string): Promise<RSSItem[]> => {
  // Check cache first
  const cached = RSS_CACHE[url];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await axios.get(`${CORS_PROXY}${encodeURIComponent(url)}`);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');
    const channel = xmlDoc.querySelector('channel') || xmlDoc.querySelector('feed');
    const items = xmlDoc.querySelectorAll('item, entry');
    const sourceName = getElementText(xmlDoc, 'channel > title, feed > title');

    const parsedItems: RSSItem[] = Array.from(items)
      .map(item => {
        try {
          const title = getElementText(item, 'title');
          const description = getElementText(item, 'description, content, summary');
          const link = item.querySelector('link')?.getAttribute('href') || 
                      getElementText(item, 'link') || '#';
          const pubDate = getElementText(item, 'pubDate, published, updated');
          const author = getElementText(item, 'author, creator, dc\\:creator');
          const categories = Array.from(item.querySelectorAll('category'))
            .map(cat => cat.textContent?.trim() || '')
            .filter(Boolean);
          
          // Try to get image from the item's XML
          const itemXml = item.outerHTML;
          let image = extractImageUrl(itemXml);

          // If no image found in item, try looking in the description
          if (!image && description) {
            image = extractImageUrl(description);
          }

          return {
            title: title || 'No Title',
            link,
            description: description || '',
            pubDate: pubDate || new Date().toISOString(),
            author: author || undefined,
            categories: categories.length > 0 ? categories : [sourceName],
            image,
            source: sourceName
          };
        } catch (error) {
          console.error('Error parsing RSS item:', error);
          return null;
        }
      })
      .filter((item): item is RSSItem => item !== null);

    // Cache the result
    RSS_CACHE[url] = {
      data: parsedItems,
      timestamp: Date.now()
    };

    return parsedItems;
  } catch (error) {
    console.error(`Error fetching RSS feed ${url}:`, error);
    return [];
  }
};

// Feed URLs
export const GAMING_NEWS_FEEDS = {
  'ign': 'https://feeds.feedburner.com/ign/games-all',
  'gamespot': 'https://www.gamespot.com/feeds/game-news',
  'polygon': 'https://www.polygon.com/rss/index.xml',
  'steam': 'https://store.steampowered.com/news/collection/steam/feed',
  'pcgamer': 'https://www.pcgamer.com/rss/'
};

export const ESPORTS_FEEDS = {
  'hltv': 'https://www.hltv.org/rss/news',
  'dotesports': 'https://dotesports.com/feed',
  'eslgaming': 'https://eslgaming.com/rss.xml',
  'esportsnet': 'https://esportsnet.com/rss.xml',
  'esportscom': 'https://www.esports.com/rss.xml',
  'reddit': 'https://www.reddit.com/r/RocketLeagueEsports/.rss'
};

export const CRYPTO_FEEDS = {
  'cointelegraph': 'https://cointelegraph.com/rss',
  'coindesk': 'https://www.coindesk.com/arc/outboundfeeds/rss/',
  'decrypt': 'https://decrypt.co/feed'
};

export const TECH_NEWS_FEEDS = {
  'theverge': 'https://www.theverge.com/rss/index.xml',
  'techcrunch': 'https://techcrunch.com/feed/',
  'engadget': 'https://www.engadget.com/rss.xml'
};

export const GAMING_CATEGORY_TAGS = {
  'all': 'All',
  'gaming-news': 'Gaming News',
  'mobile-games': 'Mobile Games',
  'game-reviews': 'Reviews',
  'console-news': 'Console News'
};

export const ESPORTS_CATEGORY_TAGS = {
  'all': 'All',
  'csgo': 'CS:GO',
  'valorant': 'Valorant',
  'league-of-legends': 'League of Legends',
  'dota2': 'Dota 2',
  'tournaments': 'Tournaments',
  'team-news': 'Team News',
  'rocket-league': 'Rocket League'
};

export const CRYPTO_CATEGORY_TAGS = {
  'all': 'All',
  'bitcoin': 'Bitcoin',
  'ethereum': 'Ethereum',
  'solana': 'Solana',
  'altcoin': 'Altcoins',
  'memecoin': 'Memecoins',
  'defi': 'DeFi',
  'nft': 'NFT',
  'market': 'Market Analysis',
  'regulation': 'Regulation'
};

export const TECH_CATEGORY_TAGS = {
  'all': 'All',
  'hardware': 'Hardware',
  'software': 'Software',
  'gadget': 'Gadgets',
  'ai': 'AI & ML',
  'security': 'Security',
  'review': 'Reviews',
  'mobile': 'Mobile Tech'
};

export const getFeedsByType = (feedType: string) => {
  switch (feedType) {
    case 'gaming':
      return GAMING_NEWS_FEEDS;
    case 'esports':
      return ESPORTS_FEEDS;
    case 'crypto':
      return CRYPTO_FEEDS;
    case 'tech':
      return TECH_NEWS_FEEDS;
    default:
      return {};
  }
};

export const fetchFeedsByType = async (feedType: string): Promise<RSSItem[]> => {
  const feeds = getFeedsByType(feedType);
  
  // Fetch all feeds in parallel
  const feedPromises = Object.values(feeds).map(url => fetchRSSFeed(url));
  const results = await Promise.all(feedPromises);
  
  // Combine all items and sort by date
  return results
    .flat()
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
};
