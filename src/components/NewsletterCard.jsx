import React from 'react';
import { Link } from 'react-router-dom';

const NewsletterCard = ({ newsletter }) => {
  const { slug, bannerImage, title, content, publicationDate, tags } = newsletter;

  return (
    <Link 
      to={`/newsletter/${slug}`} 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative pb-2/3">
        <img 
          src={bannerImage} 
          alt={title} 
          className="absolute h-full w-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h2>
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{content}</p>
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {new Date(publicationDate).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NewsletterCard;