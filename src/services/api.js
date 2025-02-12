import axios from 'axios';
import { useState, useEffect } from 'react';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Función para obtener los blogs destacados sin caché
export const getFeaturedBlogs = async () => {
  try {
    const response = await api.get(`/newsletters?_=${Date.now()}`);

    if (!response.data.success) {
      throw new Error('Failed to fetch blogs');
    }

    return response.data.data; 
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    throw error;
  }
};

// Función para obtener un blog específico por slug sin caché
export const getBlogBySlug = async (slug) => {
  try {
    const response = await api.get(`/newsletters/${slug}?_=${Date.now()}`); // 🔥 Evita caché

    if (!response.data.success) {
      throw new Error('Failed to fetch blog');
    }

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
