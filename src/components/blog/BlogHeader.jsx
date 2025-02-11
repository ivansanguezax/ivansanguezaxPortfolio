//src/components/blog/BlogHeader.jsx
import { useState, useEffect } from 'react';

const BlogHeader = ({ categories, activeCategory, onCategoryChange, onSortChange }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title and Description */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Un café contigo</h1>
        <p className="text-lg text-gray-600">
          Here, we share travel tips, destination guides, and stories that inspire your next adventure.
        </p>
      </div>

      {/* Categories and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'All'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative min-w-[150px]">
          <select
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;