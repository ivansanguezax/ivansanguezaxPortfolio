import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { cn } from "../lib/utils";

export const FollowerPointerCard = ({
  children,
  className,
  title,
  icon,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = React.useRef(null);
  const [rect, setRect] = useState(null);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const updateRect = () => {
      if (ref.current) {
        setRect(ref.current.getBoundingClientRect());
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, []);

  const handleMouseMove = (e) => {
    if (rect) {
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      
      x.set(relativeX);
      y.set(relativeY);
    }
  };

  const handleMouseLeave = () => {
    setIsInside(false);
  };

  const handleMouseEnter = () => {
    setIsInside(true);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        ref={ref}
        className="relative cursor-none"
      >
        {children}
        <AnimatePresence>
          {isInside && <FollowPointer x={x} y={y} title={title} icon={icon} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const FollowPointer = ({
  x,
  y,
  title,
  icon,
}) => {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      style={{
        top: y,
        left: x,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="bg-white border-2 border-black rounded-full px-4 py-2 flex items-center space-x-2 shadow-md -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <span className="font-medium text-black">{title}</span>
        {icon && (
          <img
            src={icon}
            alt="Icon"
            className="w-6 h-6"
          />
        )}
      </motion.div>
    </motion.div>
  );
};