import React, { useState } from 'react';

export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface TableOfContentsProps {
  headings: Heading[];
  title?: string;
  className?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings = [], title = 'Table of Contents', className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const filteredHeadings = headings.filter(h => h.depth >= 2 && h.depth <= 3);
  let h2Counter = 0;
  let h3Counter = 0;

  return (
    <div className={`toc-container bg-gray-50 dark:bg-slate-800 px-4 pb-4 rounded-lg ${className}`}>
      <div className="flex justify-between items-center cursor-pointer py-2" id="toc-header" onClick={() => setIsExpanded(e => !e)}>
        <h4 className="text-base font-bold sm:mt-4">{title}</h4>
        <button
          id="toc-toggle"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center justify-center"
          aria-label="Toggle table of contents"
          tabIndex={-1}
          type="button"
        >
          <span className={`w-5 h-5 transition-transform ${isExpanded ? '' : 'rotate-180'}`}>▼</span>
        </button>
      </div>
      <div id="toc-content" className={isExpanded ? '' : 'hidden'}>
        {filteredHeadings.length > 0 ? (
          <ol className="list-none space-y-1 m-0">
            {filteredHeadings.map((heading) => {
              if (heading.depth === 2) {
                h2Counter++;
                h3Counter = 0;
                return (
                  <li className="toc-item" key={heading.slug}>
                    <a
                      href={`#${heading.slug}`}
                      className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex no-underline text-sm"
                    >
                      <span className="mr-2">{h2Counter}.</span>
                      <span>{heading.text}</span>
                    </a>
                  </li>
                );
              } else if (heading.depth === 3) {
                h3Counter++;
                return (
                  <li className="toc-item ml-4" key={heading.slug}>
                    <a
                      href={`#${heading.slug}`}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-xs flex no-underline"
                    >
                      <span className="mr-2">{h2Counter}.{h3Counter}</span>
                      <span>{heading.text}</span>
                    </a>
                  </li>
                );
              }
              return null;
            })}
          </ol>
        ) : (
          <p className="text-xs text-gray-500 dark:text-gray-400 m-0">No headings found in this article.</p>
        )}
      </div>
      <style>{`
        .toc-container a {
          color: inherit !important;
          text-decoration: none !important;
        }
        .toc-container a:hover {
          color: inherit !important;
        }
        .toc-item a {
          color: #374151 !important;
        }
        .toc-item a:hover {
          color: #111827 !important;
        }
        :global(.dark) .toc-item a {
          color: #D1D5DB !important;
        }
        :global(.dark) .toc-item a:hover {
          color: #FFFFFF !important;
        }
        .toc-item.ml-4 a {
          color: #4B5563 !important;
        }
        :global(.dark) .toc-item.ml-4 a {
          color: #9CA3AF !important;
        }
      `}</style>
    </div>
  );
};

export default TableOfContents;
