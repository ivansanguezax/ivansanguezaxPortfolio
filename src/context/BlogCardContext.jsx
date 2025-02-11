import { createContext, useContext, useState } from 'react';

const BlogCardContext = createContext(null);

export const BlogCardProvider = ({ children }) => {
  const [openCardId, setOpenCardId] = useState(null);

  return (
    <BlogCardContext.Provider value={{ openCardId, setOpenCardId }}>
      {children}
    </BlogCardContext.Provider>
  );
};

export const useBlogCard = () => {
  const context = useContext(BlogCardContext);
  if (!context) {
    throw new Error('useBlogCard must be used within a BlogCardProvider');
  }
  return context;
};