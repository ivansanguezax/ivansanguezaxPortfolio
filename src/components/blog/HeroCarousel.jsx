import { useEffect, useState } from 'react';
import { getFeaturedBlogs } from '../../services/api';
import CarouselItem from './CarouselItem';
import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselIndicator,
  CarouselItem as CarouselSlide,
} from '../core/carousel/index';

const HeroCarousel = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await getFeaturedBlogs();
        if (data && Array.isArray(data)) {
          // Tomamos solo los primeros 4 blogs
          setBlogs(data.slice(0, 4));
        } else {
          setError('Invalid data format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[600px] md:h-[500px] bg-gray-200 animate-pulse" />
    );
  }

  if (error) {
    return (
      <div className="w-full h-[600px] md:h-[500px] flex items-center justify-center bg-gray-100">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="w-full h-[600px] md:h-[500px] flex items-center justify-center bg-gray-100">
        <p>No blogs available</p>
      </div>
    );
  }

  // Si solo hay un blog, mostrar sin carrusel
  if (blogs.length === 1) {
    return <CarouselItem blog={blogs[0]} />;
  }

  return (
    <div className="relative w-full">
      <Carousel opts={{ 
        loop: true,
        align: "start",
        autoplay: true,
        interval: 5000 // 5 segundos entre cada slide
      }}>
        <CarouselContent>
          {blogs.map((blog) => (
            <CarouselSlide key={blog.id}>
              <CarouselItem blog={blog} />
            </CarouselSlide>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselNavigation alwaysShow />
        </div>
        <CarouselIndicator />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;