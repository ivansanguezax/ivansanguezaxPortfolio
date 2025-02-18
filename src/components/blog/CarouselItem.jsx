import { Chip } from 'primereact/chip';

const CarouselItem = ({ blog }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="relative h-[600px] md:h-[500px] w-full cursor-pointer" 
      onClick={() => navigate(`/blog/${blog.slug}`)}
    >
      {/* Imagen de fondo con lazy loading */}
      <img
        src={blog.bannerImage}
        alt={blog.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      
      {/* Overlay gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"
        aria-hidden="true"
      />

      {/* Contenido */}
      <div className="relative h-full container mx-auto px-4">
        <div className="flex flex-col justify-center h-full md:w-2/3 space-y-4">
          {/* Tags */}
          <div className="flex gap-2">
            {blog.tags.slice(0, 2).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                className="bg-white/80 text-gray-700 font-medium"
              />
            ))}
          </div>

          {/* Título */}
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {blog.title}
          </h2>

          {/* Descripción */}
          <p className="text-white/90 text-lg line-clamp-2">
            {blog.content}
          </p>

          {/* Autor e información */}
          <div className="flex items-center gap-3 mt-4">
            <img
              src="https://res.cloudinary.com/dfgjenml4/image/upload/v1721000470/ujz3ew4m573pawhcamhi.png"
              alt="Autor"
              className="w-auto h-12 "
              loading="lazy"
            />
            <div>
              <p className="text-white font-medium">{blog.author}</p>
              <p className="text-white/80 text-sm">
                {formatDate(blog.publicationDate)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;