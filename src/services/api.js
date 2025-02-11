import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Función auxiliar para manejar el caché
const cacheManager = {
  set: (key, data) => {
    const cacheItem = {
      data,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
  },

  get: (key) => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = new Date().getTime();
    const cacheDuration = parseInt(import.meta.env.VITE_CACHE_DURATION || 3600000);

    // Verifica si el caché ha expirado
    if (now - timestamp > cacheDuration) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  },

  clear: (key) => {
    localStorage.removeItem(key);
  }
};

// Función para obtener los blogs destacados
export const getFeaturedBlogs = async () => {
  try {
    const cacheKey = 'featured_blogs';
    const cachedData = cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const response = await api.get('/newsletters');
    
    if (!response.data.success) {
      throw new Error('Failed to fetch blogs');
    }

    // Obtener solo los 3 primeros blogs
    const featuredBlogs = response.data.data.slice(0, 3);

    // Guardar en caché
    cacheManager.set(cacheKey, featuredBlogs);

    return featuredBlogs;
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    throw error;
  }
};

// Función para obtener un blog específico por slug
export const getBlogBySlug = async (slug) => {
  try {
    const cacheKey = `blog_${slug}`;
    const cachedData = cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const response = await api.get(`/newsletters/${slug}`);
    
    if (!response.data.success) {
      throw new Error('Failed to fetch blog');
    }

    // Guardar en caché
    cacheManager.set(cacheKey, response.data.data);

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    throw error;
  }
};

// Hook personalizado para manejar el estado de la carga y errores
export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getFeaturedBlogs();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
};

export default api;