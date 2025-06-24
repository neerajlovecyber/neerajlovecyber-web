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
          className="text-gray-800 hover:text-white dark:text-white dark:hover:text-white flex items-center justify-center"
          aria-label="Toggle table of contents"
          tabIndex={-1}
          type="button"
        >
          <span className="w-5 h-5 text-lg select-none">{isExpanded ? '▲' : '▼'}</span>
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
                      className="flex no-underline text-sm"
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
                      className="text-xs flex no-underline"
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
          color: #FFF !important; /* High contrast for light mode */
          text-decoration: none !important;
          transition: color 0.15s;
        }
        .toc-container a:hover {
          color: #FA003F !important; /* Strong blue for hover in light mode */
        }
        .toc-item a {
          color: #FFF !important;
        }
        .toc-item a:hover {
          color: #FA003F !important;
        }
        :global(.dark) .toc-container a {
          color: #FA003F !important; /* Pure white for all headings in dark mode */
        }
        :global(.dark) .toc-container a:hover {
          color: #FA003F !important; /* Blue-400 for hover in dark mode */
        }
        :global(.dark) .toc-item a {
          color: #fff !important;
        }
        :global(.dark) .toc-item a:hover {
          color: #fff !important;
        }
        .toc-item.ml-4 a {
          color: #fff !important; 
        }
           .toc-item.ml-4 a:hover {
          color: #FA003F !important; 
        }
        :global(.dark) .toc-item.ml-4 a {
          color: #fff !important; /* Pure white for sub-items in dark mode */
        }
      `}</style>
    </div>
  );
};

export default TableOfContents;
