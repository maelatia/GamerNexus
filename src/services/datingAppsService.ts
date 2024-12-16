import { useState, useEffect } from 'react';

export interface DatingApp {
  id: string;
  title: string;
  storeLink: string;
  mainImage: string;
  description: string;
  rating: string;
  featured: boolean;
  isNewRelease: boolean;
  tags: string[];
}

const parseCSVLine = (line: string): string[] => {
  const values: string[] = [];
  let currentValue = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === ',' && !insideQuotes) {
      values.push(currentValue.trim());
      currentValue = '';
      continue;
    }

    currentValue += char;
  }

  values.push(currentValue.trim());
  return values;
};

const generateTags = (title: string, description: string): string[] => {
  const tags: string[] = [];
  const text = (title + ' ' + description).toLowerCase();

  if (text.includes('dating') || text.includes('date')) tags.push('Dating');
  if (text.includes('friend') || text.includes('social')) tags.push('Friends');
  if (text.includes('chat') || text.includes('message')) tags.push('Chat');
  if (text.includes('video')) tags.push('Video Chat');
  if (text.includes('ai') || text.includes('replika')) tags.push('AI Girlfriend');
  if (text.includes('game') || text.includes('play')) tags.push('Gaming');
  
  return tags.length > 0 ? tags : ['General'];
};

export const getDatingApps = async (): Promise<DatingApp[]> => {
  try {
    const response = await fetch('/Scrapping/Dating%20Gamers/play.csv');
    if (!response.ok) {
      console.error('Failed to fetch CSV:', response.status, response.statusText);
      throw new Error(`Failed to fetch CSV file: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    return lines.map((line, index) => {
      try {
        const values = parseCSVLine(line);
        
        // Format: storeLink, mainImage, icon, title, publisher, rating
        const [storeLink, mainImage, , title, publisher, rating] = values;
        
        if (!storeLink || !title) {
          console.warn(`Skipping line ${index + 1} due to missing required values`);
          return null;
        }

        // Extract app ID from store link
        const id = storeLink.split('id=')[1] || String(index);
        
        // Generate description from title and publisher
        const description = `${title} by ${publisher}. Find your perfect match or make new friends in this exciting app!`;
        
        // Generate tags based on title and description
        const tags = generateTags(title, description);
        
        // Featured if rating >= 4.0
        const numericRating = parseFloat(rating);
        const featured = !isNaN(numericRating) && numericRating >= 4.0;

        return {
          id,
          title,
          storeLink,
          mainImage,
          description,
          rating: rating || '0.0',
          featured,
          isNewRelease: false,
          tags,
        };
      } catch (error) {
        console.error('Error parsing line:', line, error);
        return null;
      }
    }).filter((app): app is DatingApp => app !== null);

  } catch (error) {
    console.error('Error loading dating apps:', error);
    return [];
  }
};

export const useDatingApps = () => {
  const [apps, setApps] = useState<DatingApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadApps = async () => {
      try {
        setLoading(true);
        const data = await getDatingApps();
        setApps(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load apps');
      } finally {
        setLoading(false);
      }
    };

    loadApps();
  }, []);

  return { apps, loading, error };
};
