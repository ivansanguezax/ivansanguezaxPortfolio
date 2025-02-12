const API_BASE_URL = import.meta.env.VITE_API_URL;

export const eventApi = {
  // Obtener todos los eventos
  getAllEvents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`);
      if (!response.ok) {
        throw new Error('Error fetching events');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error in getAllEvents:', error);
      throw error;
    }
  },

  // Obtener un evento por slug
  getEventBySlug: async (slug) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${slug}`);
      if (!response.ok) {
        throw new Error('Event not found');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error in getEventBySlug:', error);
      throw error;
    }
  },

  // Obtener eventos filtrados por tag
  getEventsByTag: async (tag) => {
    try {
      const allEvents = await eventApi.getAllEvents();
      return allEvents.filter(event => event.tags.includes(tag));
    } catch (error) {
      console.error('Error in getEventsByTag:', error);
      throw error;
    }
  },

  // Obtener todos los tags únicos
  getAllTags: async () => {
    try {
      const events = await eventApi.getAllEvents();
      const tagsSet = new Set(events.flatMap(event => event.tags));
      return Array.from(tagsSet);
    } catch (error) {
      console.error('Error in getAllTags:', error);
      throw error;
    }
  },

  // Función auxiliar para formatear la fecha
  formatDate: (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: new Intl.DateTimeFormat('es', { month: 'short' }).format(date),
      year: date.getFullYear()
    };
  },

  // Verificar si un evento ya pasó
  isEventPast: (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    return eventDate < today;
  }
};

export default eventApi;