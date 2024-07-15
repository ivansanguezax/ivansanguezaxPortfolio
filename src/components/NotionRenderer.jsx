import React from 'react';

const NotionRenderer = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) {
    return <div>No content available</div>;
  }

  const renderRichText = (richTextArray) => {
    if (!richTextArray || !Array.isArray(richTextArray)) return '';
    return richTextArray.map(text => text.plain_text).join('');
  };

  const renderBlock = (block) => {
    if (!block || !block.type) return null;

    switch (block.type) {
      case 'paragraph':
        return <p key={block.id} className="mb-4">{renderRichText(block.paragraph?.rich_text)}</p>;
      case 'heading_1':
        return <h1 key={block.id} className="text-3xl font-bold mt-8 mb-4">{renderRichText(block.heading_1?.rich_text)}</h1>;
      case 'heading_2':
        return <h2 key={block.id} className="text-2xl font-bold mt-6 mb-3">{renderRichText(block.heading_2?.rich_text)}</h2>;
      case 'heading_3':
        return <h3 key={block.id} className="text-xl font-bold mt-4 mb-2">{renderRichText(block.heading_3?.rich_text)}</h3>;
      case 'bulleted_list_item':
        return <li key={block.id} className="ml-6 mb-2">{renderRichText(block.bulleted_list_item?.rich_text)}</li>;
      case 'numbered_list_item':
        return <li key={block.id} className="ml-6 mb-2">{renderRichText(block.numbered_list_item?.rich_text)}</li>;
      case 'to_do':
        return (
          <div key={block.id} className="flex items-center mb-2">
            <input type="checkbox" checked={block.to_do?.checked} readOnly className="mr-2" />
            <span>{renderRichText(block.to_do?.rich_text)}</span>
          </div>
        );
      case 'toggle':
        return (
          <details key={block.id} className="mb-4">
            <summary className="cursor-pointer">{renderRichText(block.toggle?.rich_text)}</summary>
            <div className="ml-4 mt-2">
              {block.toggle?.children?.map(child => renderBlock(child))}
            </div>
          </details>
        );
      case 'quote':
        return (
          <blockquote key={block.id} className="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic">
            {renderRichText(block.quote?.rich_text)}
          </blockquote>
        );
      case 'callout':
        return (
          <div key={block.id} className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="font-bold">{block.callout?.icon?.emoji}</p>
            <p>{renderRichText(block.callout?.rich_text)}</p>
          </div>
        );
      case 'image':
        return (
          <div key={block.id} className="flex justify-center mb-4">
            <img 
              src={block.image?.file?.url || block.image?.external?.url} 
              alt={renderRichText(block.image?.caption) || ''} 
              className="max-w-full h-auto max-h-96 object-contain"
            />
          </div>
        );
      case 'table':
        return (
          <div key={block.id} className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-gray-300">
              <tbody>
                {block.table?.rows?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.cells?.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-300 p-2">
                        {renderRichText(cell)}
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
      {blocks.map(renderBlock)}
    </div>
  );
};

export default NotionRenderer;