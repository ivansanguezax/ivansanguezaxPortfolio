// src/components/core/disclosure/index.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DisclosureContext = React.createContext(null);

export const Disclosure = ({ 
  children, 
  open = false, 
  onOpenChange,
  className = '',
  variants,
  transition
}) => {
  return (
    <DisclosureContext.Provider value={{ open, onOpenChange }}>
      <motion.div 
        className={className}
        animate={open ? 'expanded' : 'collapsed'}
        variants={variants}
        transition={transition}
      >
        {children}
      </motion.div>
    </DisclosureContext.Provider>
  );
};

export const DisclosureTrigger = ({ children }) => {
  const context = React.useContext(DisclosureContext);
  
  if (!context) {
    throw new Error('DisclosureTrigger must be used within a Disclosure');
  }

  return React.cloneElement(children, {
    'aria-expanded': context.open,
    'onClick': () => context.onOpenChange(!context.open)
  });
};

export const DisclosureContent = ({ children }) => {
  const context = React.useContext(DisclosureContext);
  
  if (!context) {
    throw new Error('DisclosureContent must be used within a Disclosure');
  }

  return (
    <AnimatePresence>
      {context.open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};