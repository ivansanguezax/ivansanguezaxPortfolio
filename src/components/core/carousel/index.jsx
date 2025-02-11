// src/components/core/carousel/index.jsx
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CarouselContext = React.createContext(null);

export const Carousel = ({
  children,
  opts = { loop: true },
  plugins = [AutoPlay({ delay: 5000 })]
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(opts, plugins);

  return (
    <CarouselContext.Provider value={{ emblaApi, emblaRef }}>
      <div className="relative overflow-hidden group" ref={emblaRef}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

export const CarouselContent = ({ children }) => {
  return <div className="flex">{children}</div>;
};

export const CarouselItem = ({ children }) => {
  return <div className="flex-[0_0_100%] min-w-0">{children}</div>;
};

export const CarouselNavigation = ({ alwaysShow = false }) => {
  const context = React.useContext(CarouselContext);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (context?.emblaApi) context.emblaApi.scrollPrev();
  }, [context?.emblaApi]);

  const scrollNext = useCallback(() => {
    if (context?.emblaApi) context.emblaApi.scrollNext();
  }, [context?.emblaApi]);

  useEffect(() => {
    if (!context?.emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(context.emblaApi.canScrollPrev());
      setCanScrollNext(context.emblaApi.canScrollNext());
    };

    context.emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      context.emblaApi.off('select', onSelect);
    };
  }, [context?.emblaApi]);

  if (!context?.emblaApi) return null;

  return (
    <>
      <button
        onClick={scrollPrev}
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-md transition-opacity ${
          alwaysShow ? 'opacity-75' : 'opacity-0'
        } hover:opacity-100 group-hover:opacity-75`}
        disabled={!canScrollPrev}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-md transition-opacity ${
          alwaysShow ? 'opacity-75' : 'opacity-0'
        } hover:opacity-100 group-hover:opacity-75`}
        disabled={!canScrollNext}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </>
  );
};

export const CarouselIndicator = () => {
  const context = React.useContext(CarouselContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  useEffect(() => {
    if (!context?.emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(context.emblaApi.selectedScrollSnap());
    };

    setScrollSnaps(context.emblaApi.scrollSnapList());
    context.emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      context.emblaApi.off('select', onSelect);
    };
  }, [context?.emblaApi]);

  if (!context?.emblaApi) return null;

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          className={`w-2 h-2 rounded-full transition-all ${
            index === selectedIndex
              ? 'bg-white scale-125'
              : 'bg-white/50 hover:bg-white/75'
          }`}
          onClick={() => context.emblaApi.scrollTo(index)}
        />
      ))}
    </div>
  );
};