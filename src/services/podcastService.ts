import { useState, useEffect } from 'react';

export interface PodcastItem {
  title: string;
  link: string;
  image: string;
  description: string;
  pubDate: string;
  duration?: string;
  show?: string;
  source?: string; // Add source property to PodcastItem interface
  podcaster?: string; // Add podcaster property to PodcastItem interface
}

const CACHE_KEY = 'podcastCache';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds

const parseCSVLine = (line: string): string[] => {
  const values: string[] = [];
  let currentValue = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      values.push(currentValue.trim());
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  values.push(currentValue.trim());
  return values.map(value => value.replace(/^"|"$/g, '').trim());
};

const fetchTechPodcasts = async (): Promise<PodcastItem[]> => {
  try {
    console.log('Fetching tech podcasts...');
    
    // Fetch Spotify tech podcasts first
    const spotifyResponse = await fetch('/Scrapping/Podcasts/Tech/spotify_tech.csv');
    if (!spotifyResponse.ok) {
      console.error('Failed to fetch Spotify tech podcasts:', spotifyResponse.status, spotifyResponse.statusText);
      return [];
    }
    const spotifyText = await spotifyResponse.text();
    console.log('Spotify Tech CSV content length:', spotifyText.length);
    
    let spotifyPodcasts: PodcastItem[] = [];
    try {
      spotifyPodcasts = parseData(spotifyText, 'spotify')
        .slice(0, 30)
        .map(podcast => ({
          ...podcast,
          source: 'spotify'
        }));
      console.log('Parsed Spotify tech podcasts:', spotifyPodcasts.length);
    } catch (parseError) {
      console.error('Error parsing Spotify tech podcasts:', parseError);
    }

    // Fetch Apple tech podcasts
    const appleResponse = await fetch('/Scrapping/Podcasts/Tech/apple_tech.csv');
    if (!appleResponse.ok) {
      console.error('Failed to fetch Apple tech podcasts:', appleResponse.status);
      return spotifyPodcasts;
    }
    const appleText = await appleResponse.text();
    console.log('Apple Tech CSV content length:', appleText.length);
    
    let applePodcasts: PodcastItem[] = [];
    try {
      applePodcasts = parseData(appleText, 'apple')
        .slice(0, 30)
        .map(podcast => ({
          ...podcast,
          source: 'apple'
        }));
      console.log('Parsed Apple tech podcasts:', applePodcasts.length);
    } catch (parseError) {
      console.error('Error parsing Apple tech podcasts:', parseError);
    }

    // Combine podcasts and remove duplicates based on title
    const allPodcasts = [...spotifyPodcasts, ...applePodcasts];
    const uniquePodcasts = allPodcasts.reduce((acc: PodcastItem[], current) => {
      const isDuplicate = acc.some(
        item => item.title.toLowerCase().trim() === current.title.toLowerCase().trim()
      );
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);

    console.log('Total unique tech podcasts:', uniquePodcasts.length);

    return uniquePodcasts
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 60);

  } catch (error) {
    console.error('Error fetching tech podcasts:', error);
    return [];
  }
};

const fetchGamingPodcasts = async (): Promise<PodcastItem[]> => {
  try {
    console.log('Fetching gaming podcasts...');
    
    // Fetch Spotify gaming podcasts first
    const spotifyResponse = await fetch('/Scrapping/Podcasts/Gaming/spotify_gaming.csv');
    if (!spotifyResponse.ok) {
      console.error('Failed to fetch Spotify gaming podcasts:', spotifyResponse.status, spotifyResponse.statusText);
      return [];
    }
    const spotifyText = await spotifyResponse.text();
    console.log('Spotify Gaming CSV content length:', spotifyText.length);
    
    let spotifyPodcasts: PodcastItem[] = [];
    try {
      spotifyPodcasts = parseData(spotifyText, 'spotify')
        .slice(0, 30)
        .map(podcast => ({
          ...podcast,
          source: 'spotify'
        }));
      console.log('Parsed Spotify gaming podcasts:', spotifyPodcasts.length);
    } catch (parseError) {
      console.error('Error parsing Spotify gaming podcasts:', parseError);
    }

    // Fetch Apple gaming podcasts
    const appleResponse = await fetch('/Scrapping/Podcasts/Gaming/apple_gaming.csv');
    if (!appleResponse.ok) {
      console.error('Failed to fetch Apple gaming podcasts:', appleResponse.status);
      return spotifyPodcasts;
    }
    const appleText = await appleResponse.text();
    console.log('Apple Gaming CSV content length:', appleText.length);
    
    let applePodcasts: PodcastItem[] = [];
    try {
      applePodcasts = parseData(appleText, 'apple')
        .slice(0, 30)
        .map(podcast => ({
          ...podcast,
          source: 'apple'
        }));
      console.log('Parsed Apple gaming podcasts:', applePodcasts.length);
    } catch (parseError) {
      console.error('Error parsing Apple gaming podcasts:', parseError);
    }

    // Combine podcasts and remove duplicates based on title
    const allPodcasts = [...spotifyPodcasts, ...applePodcasts];
    const uniquePodcasts = allPodcasts.reduce((acc: PodcastItem[], current) => {
      const isDuplicate = acc.some(
        item => item.title.toLowerCase().trim() === current.title.toLowerCase().trim()
      );
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);

    console.log('Total unique gaming podcasts:', uniquePodcasts.length);

    return uniquePodcasts
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 60);

  } catch (error) {
    console.error('Error fetching gaming podcasts:', error);
    return [];
  }
};

const parseData = (csvText: string, source: 'apple' | 'spotify'): PodcastItem[] => {
  if (!csvText.trim()) {
    console.log(`Empty CSV text provided to parseData for ${source}`);
    return [];
  }

  const lines = csvText.split('\n').map(line => line.trim()).filter(line => line);
  if (lines.length === 0) {
    console.log(`No valid lines found in CSV for ${source}`);
    return [];
  }

  console.log(`First line of ${source} CSV:`, lines[0]);
  const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
  console.log(`Parsed headers for ${source}:`, headers);

  return lines.slice(1).map((line, index) => {
    try {
      const values = parseCSVLine(line);
      if (values.length !== headers.length) {
        console.error(`Line ${index + 2} has ${values.length} values but expected ${headers.length}`);
        return null;
      }

      // Handle different column names across files
      const link = values[headers.indexOf('link')] || '';
      const title = values[headers.indexOf('title')] || '';
      const description = values[headers.indexOf('description')] || '';
      const podcaster = values[headers.indexOf('podcaster')] || '';
      
      // Handle different date formats
      let pubDate = values[headers.indexOf('published-date')] || values[headers.indexOf('release_date')] || new Date().toISOString();
      if (pubDate.includes('-')) {
        // Convert "27-Nov" or "6-Dec" to a full date
        const [day, month] = pubDate.split('-').map(part => part.trim());
        const year = new Date().getFullYear();
        const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
        const paddedDay = day.padStart(2, '0');
        const paddedMonth = monthNum.toString().padStart(2, '0');
        pubDate = `${year}-${paddedMonth}-${paddedDay}`;
      }

      const item = {
        image: source === 'apple' && !values[headers.indexOf('image')] ? '/images/apple/apple.png' : (values[headers.indexOf('image')] || '/podcast-placeholder.jpg'),
        link,
        title: title || podcaster, // Use podcaster name if no title
        description: description || `Podcast by ${podcaster}`, // Add default description using podcaster
        pubDate,
        duration: parseDuration(values[headers.indexOf('show_duration')] || values[headers.indexOf('duration')] || ''),
        show: podcaster || extractShowFromLink(link) || (source === 'apple' ? 'Apple Podcast' : 'Podcast'),
        source,
        podcaster
      };

      if (!item.title || !item.link) {
        console.log(`Skipping invalid item at line ${index + 2}:`, item);
        return null;
      }

      return item;
    } catch (error) {
      console.error(`Error parsing line ${index + 2}:`, error);
      return null;
    }
  }).filter((item): item is PodcastItem => item !== null);
};

const parseDuration = (duration: string): string => {
  if (!duration) return '';
  // Convert "1h 2m" format to "62 min"
  if (duration.includes('h')) {
    const [hours, minutes] = duration.split('h').map(part => {
      const num = parseInt(part.replace(/[^0-9]/g, ''));
      return isNaN(num) ? 0 : num;
    });
    return `${hours * 60 + minutes} min`;
  }
  // Handle "X min" format
  if (duration.includes('min')) {
    return duration.trim();
  }
  // If just a number, assume minutes
  const minutes = parseInt(duration);
  if (!isNaN(minutes)) {
    return `${minutes} min`;
  }
  return duration;
};

const extractShowFromLink = (link: string): string => {
  try {
    const url = new URL(link);
    const parts = url.pathname.split('/');
    const podcastIndex = parts.indexOf('podcast');
    if (podcastIndex !== -1 && podcastIndex + 1 < parts.length) {
      return parts[podcastIndex + 1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  } catch (e) {
    console.error('Error extracting show from link:', e);
  }
  return '';
};

const fetchCryptoPodcasts = async (): Promise<PodcastItem[]> => {
  try {
    console.log('Fetching crypto podcasts...');
    
    // Fetch Spotify crypto podcasts first
    const spotifyResponse = await fetch('/Scrapping/Podcasts/Crypto/spotify_crypto.csv');
    if (!spotifyResponse.ok) {
      console.error('Failed to fetch Spotify crypto podcasts:', spotifyResponse.status, spotifyResponse.statusText);
      return [];
    }
    const spotifyText = await spotifyResponse.text();
    console.log('Spotify Crypto CSV content length:', spotifyText.length);
    
    let spotifyPodcasts: PodcastItem[] = [];
    try {
      spotifyPodcasts = parseData(spotifyText, 'spotify')
        .slice(0, 30) // Take only first 30 Spotify podcasts
        .map(podcast => ({
          ...podcast,
          source: 'spotify'
        }));
      console.log('Parsed Spotify crypto podcasts:', spotifyPodcasts.length);
    } catch (parseError) {
      console.error('Error parsing Spotify crypto podcasts:', parseError);
    }

    // Fetch Apple crypto podcasts
    const appleResponse = await fetch('/Scrapping/Podcasts/Crypto/apple_crypto.csv');
    if (!appleResponse.ok) {
      console.error('Failed to fetch Apple crypto podcasts:', appleResponse.status);
      return spotifyPodcasts;
    }
    const appleText = await appleResponse.text();
    console.log('Apple Crypto CSV content length:', appleText.length);
    
    let applePodcasts: PodcastItem[] = [];
    try {
      applePodcasts = parseData(appleText, 'apple')
        .slice(0, 30) // Take only first 30 Apple podcasts
        .map(podcast => ({
          ...podcast,
          source: 'apple'
        }));
      console.log('Parsed Apple crypto podcasts:', applePodcasts.length);
    } catch (parseError) {
      console.error('Error parsing Apple crypto podcasts:', parseError);
    }

    // Combine podcasts and remove duplicates based on title
    const allPodcasts = [...spotifyPodcasts, ...applePodcasts];
    const uniquePodcasts = allPodcasts.reduce((acc: PodcastItem[], current) => {
      const isDuplicate = acc.some(
        item => item.title.toLowerCase().trim() === current.title.toLowerCase().trim()
      );
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);

    console.log('Total unique crypto podcasts:', uniquePodcasts.length);

    // Sort by publication date and limit to 60 total
    return uniquePodcasts
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 60);

  } catch (error) {
    console.error('Error fetching crypto podcasts:', error);
    return [];
  }
};

export const usePodcasts = (type: 'gaming' | 'crypto' | 'tech' = 'gaming') => {
  const [podcasts, setPodcasts] = useState<PodcastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPodcasts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Loading podcasts for type:', type);

        // Force fresh fetch for development
        const forceFresh = true; // Set to true to bypass cache
        
        // Check cache first
        const cacheKey = `${CACHE_KEY}_${type}`;
        const cachedData = localStorage.getItem(cacheKey);
        if (!forceFresh && cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const age = Date.now() - timestamp;
          
          if (age < CACHE_DURATION) {
            console.log('Using cached data');
            setPodcasts(data);
            setLoading(false);
            return;
          }
        }

        // Clear existing cache
        if (forceFresh) {
          console.log('Clearing cache to force fresh fetch');
          localStorage.removeItem(cacheKey);
        }

        // Fetch fresh data based on type
        let podcastData: PodcastItem[] = [];
        switch (type) {
          case 'tech':
            podcastData = await fetchTechPodcasts();
            break;
          case 'gaming':
            podcastData = await fetchGamingPodcasts();
            break;
          case 'crypto':
            podcastData = await fetchCryptoPodcasts();
            break;
        }

        console.log(`Fetched ${podcastData.length} podcasts for ${type}`);

        if (podcastData.length === 0) {
          throw new Error(`No ${type} podcasts found`);
        }

        // Sort by date and limit to 40 items
        const sortedPodcasts = podcastData
          .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
          .slice(0, 40);

        // Update cache
        localStorage.setItem(cacheKey, JSON.stringify({
          data: sortedPodcasts,
          timestamp: Date.now()
        }));

        setPodcasts(sortedPodcasts);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load podcasts';
        console.error('Error loading podcasts:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadPodcasts();
  }, [type]);

  return { podcasts, loading, error };
};
