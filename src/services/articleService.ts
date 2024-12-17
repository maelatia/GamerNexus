interface Author {
  name: string;
  avatar: string;
  bio: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  collection: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  date: string;
  readTime: string;
  image: string;
  content: string;
}

export async function loadArticles(): Promise<Article[]> {
  try {
    const articles: Article[] = [];
    
    // Load article1.xml
    const response1 = await fetch('/Scrapping/Articles/article1.xml');
    const xmlText1 = await response1.text();
    const parser1 = new DOMParser();
    const xmlDoc1 = parser1.parseFromString(xmlText1.trim(), 'application/xml');
    const articleElements1 = xmlDoc1.getElementsByTagName('article');
    
    // Load article2.xml
    const response2 = await fetch('/Scrapping/Articles/article2.xml');
    const xmlText2 = await response2.text();
    const parser2 = new DOMParser();
    const xmlDoc2 = parser2.parseFromString(xmlText2.trim(), 'application/xml');
    const articleElements2 = xmlDoc2.getElementsByTagName('article');
    
    // Load article3.xml
    const response3 = await fetch('/Scrapping/Articles/article3.xml');
    const xmlText3 = await response3.text();
    const parser3 = new DOMParser();
    const xmlDoc3 = parser3.parseFromString(xmlText3.trim(), 'application/xml');
    const articleElements3 = xmlDoc3.getElementsByTagName('article');
    
    // Load article4.xml
    const response4 = await fetch('/Scrapping/Articles/article4.xml');
    const xmlText4 = await response4.text();
    const parser4 = new DOMParser();
    const xmlDoc4 = parser4.parseFromString(xmlText4.trim(), 'application/xml');
    const articleElements4 = xmlDoc4.getElementsByTagName('article');
    
    // Combine articles from all files
    const allArticleElements = [
      ...Array.from(articleElements1), 
      ...Array.from(articleElements2),
      ...Array.from(articleElements3),
      ...Array.from(articleElements4)
    ];
    
    const mappedArticles = allArticleElements.map((article, index) => {
      const id = article.getAttribute('id') || String(index + 1);
      const authorElement = article.getElementsByTagName('author')[0];
      const contentElement = article.getElementsByTagName('content')[0];
      
      return {
        id,
        title: article.getElementsByTagName('title')[0]?.textContent?.trim() || '',
        slug: article.getElementsByTagName('slug')[0]?.textContent?.trim() || '',
        collection: article.getElementsByTagName('collection')[0]?.textContent?.trim() || '',
        author: {
          name: authorElement?.getElementsByTagName('n')[0]?.textContent?.trim() || '',
          avatar: authorElement?.getElementsByTagName('avatar')[0]?.textContent?.trim() || '',
          bio: authorElement?.getElementsByTagName('bio')[0]?.textContent?.trim() || '',
        },
        date: article.getElementsByTagName('date')[0]?.textContent?.trim() || '',
        readTime: article.getElementsByTagName('readTime')[0]?.textContent?.trim() || '',
        image: article.getElementsByTagName('image')[0]?.textContent?.trim() || '',
        content: contentElement ? contentElement.innerHTML : '',
      };
    });
    
    console.log('Loaded articles:', mappedArticles);
    return mappedArticles;
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}
