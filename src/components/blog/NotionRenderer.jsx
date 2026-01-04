import React, { useState } from 'react';

const NotionRenderer = ({ data }) => {
  const isImageUrl = (str) => {
    return str.match(/^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png|gif|webp)$/i) ||
           str.match(/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i);
  };

  const ImageWithErrorHandling = ({ src }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
      return null;
    }

    return (
      <div className="flex justify-center my-8">
        <div className="relative w-full max-w-2xl">
          <img 
            src={src} 
            alt="Content" 
            className="rounded-lg shadow-md w-full h-auto object-cover"
            loading="lazy"
            onError={() => setHasError(true)}
          />
        </div>
      </div>
    );
  };

  const renderImage = (src) => (
    <ImageWithErrorHandling key={src} src={src} />
  );

  const renderContent = (contents) => {
    if (!Array.isArray(contents)) {
      if (typeof contents === 'string' && isImageUrl(contents)) {
        return renderImage(contents);
      }
      return contents;
    }
    
    return contents.map((item, index) => {
      const style = {
        ...(item.annotations?.bold && { fontWeight: 'bold' }),
        ...(item.annotations?.italic && { fontStyle: 'italic' }),
        ...(item.annotations?.strikethrough && { textDecoration: 'line-through' }),
        ...(item.annotations?.underline && { textDecoration: 'underline' }),
        ...(item.annotations?.code && { 
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          backgroundColor: '#f1f1f1',
          padding: '2px 4px',
          borderRadius: '4px',
          fontSize: '0.875em'
        }),
      };

      if (typeof item.content === 'string' && isImageUrl(item.content)) {
        return renderImage(item.content);
      }

      return item.href ? (
        <a 
          key={index} 
          href={item.href} 
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors" 
          style={style}
        >
          {item.content}
        </a>
      ) : (
        <span key={index} style={style}>{item.content}</span>
      );
    });
  };

  const renderBlock = (block) => {
    switch (block.type) {
      case 'h1':
        return (
          <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900">
            {renderContent(block.content)}
          </h1>
        );
      
      case 'h2':
        return (
          <h2 className="text-3xl font-bold mt-6 mb-4 text-gray-900">
            {renderContent(block.content)}
          </h2>
        );
      
      case 'h3':
        return (
          <h3 className="text-2xl font-bold mt-5 mb-3 text-gray-900">
            {renderContent(block.content)}
          </h3>
        );
      
      case 'paragraph':
        return (
          <p className="my-4 text-gray-700 leading-relaxed">
            {renderContent(block.content)}
          </p>
        );
      
      case 'bullet':
        return (
          <li className="ml-4 text-gray-700 leading-relaxed">
            {renderContent(block.content)}
          </li>
        );
      
      case 'number':
        return (
          <li className="ml-4 text-gray-700 leading-relaxed">
            {renderContent(block.content)}
          </li>
        );
      
      case 'todo':
        return (
          <div className="flex items-center gap-2 my-2">
            <input 
              type="checkbox" 
              checked={block.checked} 
              readOnly 
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">{renderContent(block.content)}</span>
          </div>
        );
      
      case 'quote':
        return (
          <blockquote className="border-l-4 border-gray-200 pl-4 my-4 italic text-gray-700">
            {renderContent(block.content)}
          </blockquote>
        );
      
      case 'code':
        return (
          <pre className="bg-gray-50 p-4 rounded-lg my-4 overflow-x-auto">
            <code className="text-sm font-mono text-gray-800">
              {renderContent(block.content)}
            </code>
          </pre>
        );
      
      case 'divider':
        return <hr className="my-8 border-gray-200" />;
      
      case 'table':
        return (
          <div className="my-6 overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                {block.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.cells.map((cell, j) => (
                      <td 
                        key={j} 
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {renderContent(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

return (
    <div className="notion-content">
      {data.blocks.map((block, index) => (
        <div key={index}>
          {renderBlock(block)}
        </div>
      ))}
    </div>
  );
};

export default NotionRenderer;