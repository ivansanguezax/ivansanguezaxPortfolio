//src/components/blog/BlogGrid.jsx
import { useState, useEffect } from 'react';
import BlogHeader from './BlogHeader';
import BlogCard from './BlogCard';
import { getFeaturedBlogs } from '../../services/api';
import { BlogCardProvider } from '../../context/BlogCardContext'; 

const ITEMS_PER_PAGE = 8;

const BlogGrid = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await getFeaturedBlogs();
        setBlogs(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.flatMap(blog => blog.category))];
        setCategories(uniqueCategories);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading blogs:', error);
        setIsLoading(false);
      }
    };

    loadBlogs();
  }, []);

  // Filter and sort blogs
  const filteredBlogs = blogs
    .filter(blog => activeCategory === 'All' || blog.category.includes(activeCategory))
    .sort((a, b) => {
      const dateA = new Date(a.publicationDate);
      const dateB = new Date(b.publicationDate);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[350px] bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSortChange={setSortOrder}
      />

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <BlogCardProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </BlogCardProvider>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === i + 1
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogGrid;