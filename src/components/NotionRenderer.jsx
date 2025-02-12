import React from 'react';

const NotionRenderer = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) {
    return <div>No content available</div>;
  }

  const renderContent = (contentArray) => {
    if (!contentArray || !Array.isArray(contentArray)) return '';
    return contentArray.map((item, index) => {
      const { content, annotations = {}, href } = item;
      let className = '';
      
      if (annotations.bold) className += ' font-bold';
      if (annotations.italic) className += ' italic';
      if (annotations.strikethrough) className += ' line-through';
      if (annotations.underline) className += ' underline';
      if (annotations.code) className += ' font-mono bg-gray-100 px-1 rounded';

      const Element = href ? 'a' : 'span';
      const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

      return (
        <Element key={index} className={className.trim()} {...props}>
          {content}
        </Element>
      );
    }).filter(Boolean);
  };

  const renderBlock = (block) => {
    if (!block || !block.type) return null;

    switch (block.type) {
      case 'paragraph':
        return <p className="mb-4">{renderContent(block.content)}</p>;
      
      case 'h1':
        return <h1 className="text-3xl font-bold mt-8 mb-4">{renderContent(block.content)}</h1>;
      
      case 'h2':
        return <h2 className="text-2xl font-bold mt-6 mb-3">{renderContent(block.content)}</h2>;
      
      case 'h3':
        return <h3 className="text-xl font-bold mt-4 mb-2">{renderContent(block.content)}</h3>;
      
      case 'bullet':
        return <li className="ml-6 mb-2">{renderContent(block.content)}</li>;
      
      case 'number':
        return <li className="ml-6 mb-2 list-decimal">{renderContent(block.content)}</li>;
      
      case 'todo':
        return (
          <div className="flex items-center mb-2">
            <input 
              type="checkbox" 
              checked={block.checked} 
              readOnly 
              className="mr-2"
            />
            <span>{renderContent(block.content)}</span>
          </div>
        );
      
      case 'quote':
        return (
          <blockquote className="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic">
            {renderContent(block.content)}
          </blockquote>
        );
      
      case 'divider':
        return <hr className="my-8 border-t border-gray-200" />;
      
      case 'code':
        return (
          <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <code>{renderContent(block.content)}</code>
          </pre>
        );
      
      case 'table':
        return (
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-gray-300">
              <tbody>
                {block.rows?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.cells?.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-300 p-2">
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
      {blocks.map((block, index) => (
        <React.Fragment key={index}>
          {renderBlock(block)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default NotionRenderer;