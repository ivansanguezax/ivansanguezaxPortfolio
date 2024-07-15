const API_URL = import.meta.env.VITE_API_URL;

const CACHE_KEY = 'newsletterCache';
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutos en milisegundos

const getCache = () => {
  const cache = localStorage.getItem(CACHE_KEY);
  if (cache) {
    return JSON.parse(cache);
  }
  return null;
};

const setCache = (data) => {
  const cacheData = {
    timestamp: Date.now(),
    data: data
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
};

const isCacheValid = (cache) => {
  if (!cache || !cache.timestamp) return false;
  const now = Date.now();
  return now - cache.timestamp < CACHE_EXPIRATION;
};

export const getCachedNewsletters = async () => {
  try {
    const cache = getCache();
    if (cache && isCacheValid(cache) && cache.data.newsletters) {
      return cache.data.newsletters;
    }

    const response = await fetch(`${API_URL}/api/newsletters`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const newsletters = await response.json();

    setCache({ newsletters });
    return newsletters;
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    throw new Error('No se pudieron obtener los newsletters');
  }
};

export const getCachedNewsletterBySlug = async (slug) => {
  try {
    const cache = getCache();
    if (cache && isCacheValid(cache) && cache.data.newsletters) {
      const cachedNewsletter = cache.data.newsletters.find(n => n.slug === slug);
      if (cachedNewsletter) {
        return cachedNewsletter;
      }
    }

    const response = await fetch(`${API_URL}/api/newsletters/${slug}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Newsletter not found');
      }
      throw new Error('Network response was not ok');
    }
    const newsletter = await response.json();
    
    // Actualizar el caché con el nuevo newsletter
    const newsletters = cache?.data?.newsletters || [];
    const updatedNewsletters = newsletters.map(n => n.slug === slug ? newsletter : n);
    if (!updatedNewsletters.find(n => n.slug === slug)) {
      updatedNewsletters.push(newsletter);
    }
    setCache({ newsletters: updatedNewsletters });
    
    return newsletter;
  } catch (error) {
    console.error('Error fetching newsletter by slug:', error);
    throw error;
  }
};

export const invalidateCache = () => {
  localStorage.removeItem(CACHE_KEY);
};