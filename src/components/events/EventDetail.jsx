import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { eventApi } from "../../services/eventApi";
import Header from "../Header";
import Footer from "../Footer";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import NotionRenderer from "../NotionRenderer";
import { ArrowLeft, MapPin } from "lucide-react";
import { Helmet } from "react-helmet-async";

const EventDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEventData = async () => {
      try {
        const eventData = await eventApi.getEventBySlug(slug);
        setEvent(eventData);
      } catch (error) {
        console.error("Error loading event:", error);
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };

    loadEventData();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center pt-32">
          <div className="animate-pulse space-y-8 w-full max-w-4xl px-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-64 bg-gray-200 rounded w-full" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) return null;

  const isEventPast = () => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate < today;
  };

  const addToGoogleCalendar = () => {
    const eventDate = new Date(event.date);
    const endDate = new Date(eventDate);
    endDate.setHours(eventDate.getHours() + 2);

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.name
    )}&location=${encodeURIComponent(
      event.location || "Por definir"
    )}&dates=${eventDate
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}/${endDate
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}`;
    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{`${event.name} | Eventos`}</title>
        <meta name="description" content={event.description || event.name} />
        <meta name="author" content={event.panelist?.name || "Organizador"} />
        <meta name="keywords" content={event.tags.join(", ")} />

        {/* Open Graph */}
        <meta property="og:type" content="event" />
        <meta property="og:title" content={event.name} />
        <meta
          property="og:description"
          content={event.description || event.name}
        />
        <meta property="og:image" content={event.bgImage} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="Eventos" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={event.name} />
        <meta
          name="twitter:description"
          content={event.description || event.name}
        />
        <meta name="twitter:image" content={event.bgImage} />

        {/* Event Metadata */}
        <meta property="event:start_time" content={event.date} />
        <meta
          property="event:location"
          content={event.location || "Por definir"}
        />
        {event.tags.map((tag, index) => (
          <meta key={index} property="event:tag" content={tag} />
        ))}
      </Helmet>

      <Header />

      <main className="pt-32">
        <div className="max-w-4xl mx-auto px-4">
          {/* Botón Regresar */}
          <button
            onClick={() => navigate("/events")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Regresar a eventos</span>
          </button>

          {/* Header del evento */}
          <header className="mb-8">
            <div className="mb-4">
              <p className="text-lg text-gray-600">{formatDate(event.date)}</p>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {event.name}
            </h1>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between mb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={20} />
                  <span>{event.location || "Por definir"}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Tag
                      key={tag}
                      value={tag}
                      severity="info"
                      className="text-sm"
                    />
                  ))}
                </div>
              </div>

              {!isEventPast() && (
                <div className="flex flex-wrap gap-3">
                  <Button
                    label="Registrarme"
                    icon="pi pi-external-link"
                    onClick={() => window.open(event.urlRegister, "_blank")}
                    className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full"
                  />
                  <Button
                    label="Agregar al calendario"
                    icon="pi pi-calendar"
                    onClick={addToGoogleCalendar}
                    className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full"
                  />
                </div>
              )}
            </div>

            {/* Panelista */}
            {event.panelist && (
              <div className="flex items-center gap-3 border-t pt-6">
                <img
                  src="https://res.cloudinary.com/dfgjenml4/image/upload/v1721000470/ujz3ew4m573pawhcamhi.png"
                  alt={event.panelist.name}
                  className="w-auto h-12"
                  loading="lazy"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {event.panelist.name}
                  </p>
                  <p className="text-sm text-gray-500">Ponente</p>
                </div>
              </div>
            )}
          </header>

          {/* Contenido del evento */}
          {event.blocks && event.blocks.length > 0 && (
            <article className="prose prose-lg prose-gray max-w-none">
              <NotionRenderer blocks={event.blocks} />
            </article>
          )}

          {/* Mensaje si no hay contenido */}
          {(!event.blocks || event.blocks.length === 0) && (
            <div className="text-center py-8">
              <p className="text-gray-600">
                No hay contenido adicional disponible para este evento.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetail;
