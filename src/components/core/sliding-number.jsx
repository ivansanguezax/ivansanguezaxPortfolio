import { motion, AnimatePresence } from 'framer-motion';

export function SlidingNumber({ value, padStart = false }) {
  const displayValue = padStart ? value.toString().padStart(2, '0') : value.toString();

  return (
    <div className="relative h-5 w-4">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {displayValue}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}