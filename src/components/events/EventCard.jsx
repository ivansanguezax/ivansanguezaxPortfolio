import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const { date, name, location, urlRegister, bgImage, slug, panelist } = event;
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  };

  const isEventPast = () => {
    const eventDate = new Date(date);
    const today = new Date();
    return eventDate < today;
  };

  const addToGoogleCalendar = () => {
    const eventDate = new Date(date);
    const endDate = new Date(eventDate);
    endDate.setHours(eventDate.getHours() + 2);

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(name)}&location=${encodeURIComponent(location || 'Por definir')}&dates=${eventDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`;
    window.open(googleCalendarUrl, '_blank');
  };

  const customButtonClass = "w-full md:w-auto bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-all duration-300";

  return (
    <Card className="shadow-lg border-2 border-gray-300 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Contenido izquierdo */}
        <div className="flex-1 space-y-4">
          {/* Fecha y Autor */}
          <div className="flex flex-col space-y-3">
            <div className="text-gray-600">
              {formatDate(date)}
            </div>
          </div>

          {/* Título */}
          <h2 className="text-2xl font-bold text-gray-900">
            {name}
          </h2>

          {/* Ubicación y Tags */}
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={20} />
              <span>{location || 'Por definir'}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <Tag 
                  key={tag} 
                  value={tag} 
                  className="bg-green-50 text-green-700 border border-green-200" 
                  rounded 
                />
              ))}
            </div>
          </div>

          {panelist && (
            <div className="flex items-center gap-3 mt-4">
              <img
                src="https://res.cloudinary.com/dfgjenml4/image/upload/v1721000470/ujz3ew4m573pawhcamhi.png"
                alt={panelist.name}
                className="w-auto h-10"
                loading="lazy"
              />
              <div>
                <p className="font-medium text-gray-900">{panelist.name}</p>
                <p className="text-sm text-gray-500">Ponente</p>
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="flex flex-col md:flex-row gap-3 pt-4">
            {!isEventPast() ? (
              <>
                <Button
                  label="Registrarme"
                  icon="pi pi-external-link"
                  onClick={() => window.open(urlRegister, '_blank')}
                  className={customButtonClass}
                />
                <Button
                  label="Agregar al calendario"
                  icon="pi pi-calendar"
                  onClick={addToGoogleCalendar}
                  className={customButtonClass}
                />
              </>
            ) : (
              <div className="flex flex-col md:flex-row w-full gap-3">
                <Tag 
                  value="Evento finalizado" 
                  className="bg-red-50 text-red-700 border border-red-200 text-base py-2 w-full text-center"
                />
                <Button
                  label="Ver detalle"
                  icon="pi pi-eye"
                  onClick={() => navigate(`/events/${slug}`)}
                  className={customButtonClass}
                />
              </div>
            )}
          </div>
        </div>

        {/* Imagen derecha */}
        <div className="md:w-1/3 h-auto relative min-h-[200px] mt-4 mb-6 md:my-0">
          <img
            src={bgImage}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover rounded-lg shadow-md"
            style={{ aspectRatio: '16/9' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x225?text=No+Image';
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default EventCard;