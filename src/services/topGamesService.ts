import { useState, useEffect } from 'react';
import { mediaService, MEDIA_SIZES } from './mediaService';

export interface TopGame {
  id: string;
  title: string;
  storeLink: string;
  mainImage: string;
  price: string;
  isNew: boolean;
  tags: string[];
}

const generateTags = (title: string): string[] => {
  const tags: string[] = ['All'];
  const titleLower = title.toLowerCase();

  // Add game-specific tags
  if (titleLower.includes('counter') || titleLower.includes('cs') || titleLower.includes('shooter')) {
    tags.push('FPS');
  }
  if (titleLower.includes('path') || titleLower.includes('rpg') || titleLower.includes('final fantasy')) {
    tags.push('RPG');
  }
  if (titleLower.includes('marvel') || titleLower.includes('rivals') || titleLower.includes('street fighter')) {
    tags.push('Action');
  }
  if (titleLower.includes('free')) {
    tags.push('Free to Play');
  }
  if (titleLower.includes('strategy') || titleLower.includes('civilization')) {
    tags.push('Strategy');
  }
  if (titleLower.includes('sports') || titleLower.includes('fifa') || titleLower.includes('nba')) {
    tags.push('Sports');
  }

  return tags;
};

const parseCSVLine = (line: string): string[] => {
  const values: string[] = [];
  let currentValue = '';
  let withinQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      withinQuotes = !withinQuotes;
    } else if (char === ',' && !withinQuotes) {
      values.push(currentValue.trim().replace(/^"|"$/g, ''));
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  values.push(currentValue.trim().replace(/^"|"$/g, ''));
  return values;
};

const processImageUrl = (url: string): string => {
  if (!url) {
    return 'https://placehold.co/750x400/1a1a1a/purple?text=No+Image';
  }

  // Handle Steam images
  if (url.includes('steamstatic.com')) {
    // Replace small capsule with larger header image
    return url.replace('capsule_231x87', 'header');
  }

  return url;
};

export const getTopGames = async (): Promise<TopGame[]> => {
  try {
    const response = await fetch('/Scrapping/top_games/store.csv');
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV file: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    // Skip header
    const dataLines = lines.slice(1);
    
    return dataLines.map((line, index) => {
      try {
        const values = parseCSVLine(line);
        const [_, link, image, title, price, isNew] = values;

        return {
          id: String(index + 1),
          title: title || 'Unknown Game',
          storeLink: link || '',
          mainImage: mediaService.processImageUrl(image, MEDIA_SIZES.card),
          price: price || 'Price Not Available',
          isNew: isNew?.toLowerCase() === 'new',
          tags: generateTags(title)
        };
      } catch (error) {
        console.error('Error parsing line:', line, error);
        return null;
      }
    }).filter((game): game is TopGame => game !== null);

  } catch (error) {
    console.error('Error loading top games:', error);
    return [];
  }
};

export const useTopGames = () => {
  const [games, setGames] = useState<TopGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await getTopGames();
        setGames(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load games');
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  return { games, loading, error };
};
