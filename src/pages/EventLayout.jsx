import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import { Skeleton } from 'primereact/skeleton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventCard from '../components/events/EventCard';
import { eventApi } from '../services/eventApi';

const ROWS = 6;

export default function EventLayout() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('All');
  const [tags, setTags] = useState([]);
  const [first, setFirst] = useState(0);
  const [page, setPage] = useState(0);

  // Nuevo useEffect para manejar el scroll al top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [eventsData, tagsData] = await Promise.all([
          eventApi.getAllEvents(),
          eventApi.getAllTags()
        ]);
        setEvents(eventsData);
        setFilteredEvents(sortEvents(eventsData));
        setTags(['All', ...tagsData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortEvents = (events) => {
    return [...events].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const today = new Date();
      const isPastA = dateA < today;
      const isPastB = dateB < today;

      if (isPastA && !isPastB) return 1;
      if (!isPastA && isPastB) return -1;
      return dateA - dateB;
    });
  };

  useEffect(() => {
    let result = events;

    if (selectedTag !== 'All') {
      result = result.filter(event => 
        event.tags.includes(selectedTag)
      );
    }

    setFilteredEvents(sortEvents(result));
    setFirst(0);
    setPage(0);
  }, [selectedTag, events]);

  const onPageChange = (e) => {
    setFirst(e.first);
    setPage(e.page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginatedEvents = filteredEvents.slice(first, first + ROWS);

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      
      <main className="pt-28 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold">
              <span className="block text-gray-900">Próximos</span>
              <span className="block text-blue-600">Eventos y Charlas</span>
            </h1>
            <p className="mt-3 text-gray-600 sm:text-lg max-w-2xl mx-auto">
              Descubre y participa en nuestros eventos técnicos y charlas sobre tecnología.
            </p>
          </div>

          {/* Filtros */}
          <div className="flex justify-center gap-2 mb-12 overflow-x-auto py-2">
            {tags.map((tag) => (
              <Button
                key={tag}
                label={tag}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedTag === tag 
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedTag(tag)}
              />
            ))}
          </div>

          {/* Lista de Eventos */}
          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <Skeleton height="12rem" className="mb-2" />
                  <Skeleton width="60%" height="2rem" className="mb-2" />
                  <Skeleton width="40%" height="2rem" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {paginatedEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {/* Mensaje si no hay resultados */}
              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <i className="pi pi-calendar text-4xl text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No hay eventos
                  </h3>
                  <p className="text-gray-500">
                    No se encontraron eventos para esta categoría.
                  </p>
                </div>
              )}

              {/* Paginación */}
              {filteredEvents.length > ROWS && (
                <div className="flex justify-center mt-12 gap-2">
                  <Paginator
                    first={first}
                    rows={ROWS}
                    totalRecords={filteredEvents.length}
                    onPageChange={onPageChange}
                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    className="border-none"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}