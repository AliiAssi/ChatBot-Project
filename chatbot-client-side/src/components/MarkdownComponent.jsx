import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { MarkdownErrorBoundary } from './MarkdownErrorBoundary';
import { CustomRenderers } from '../utils/MarkdownRenderers';

const MarkdownComponent = memo(function MarkdownComponent({ markdownText }) {
  const [expanded, setExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(markdownText));
  }, [markdownText]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const newBookmarks = isBookmarked
      ? bookmarks.filter(text => text !== markdownText)
      : [...bookmarks, markdownText];
    
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    let element = null;
  
    try {
      // Create temporary container with visible content
      element = document.createElement('div');
      element.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 210mm;          // A4 width
        min-height: 297mm;     // A4 height
        padding: 20px;
        background: white;
        z-index: 9999;
        pointer-events: none;  // Allow interaction with main UI
      `;
  
      // Render content with proper scaling
      const { renderToStaticMarkup } = await import('react-dom/server');
      element.innerHTML = renderToStaticMarkup(
        <div style={{ transform: 'scale(1)', transformOrigin: 'top left' }}>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            components={CustomRenderers}
          >
            {markdownText}
          </ReactMarkdown>
        </div>
      );
  
      document.body.appendChild(element);
  
      // Force DOM update before capture
      await new Promise(resolve => requestAnimationFrame(resolve));
  
      // Configure html2canvas with precise dimensions
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        onclone: (clonedDoc) => {
          clonedDoc.body.style.visibility = 'visible';
        }
      });
  
      // Create single-page PDF with auto-scaling
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate scaling ratio to fit content
      const ratio = Math.min(
        pageWidth / canvas.width,
        pageHeight / canvas.height
      );
  
      // Add scaled image to single page
      pdf.addImage(
        canvas.toDataURL('image/png', 1.0),
        'PNG',
        0,
        0,
        canvas.width * ratio,
        canvas.height * ratio
      );
  
      pdf.save('document.pdf');
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
      if (element) {
        document.body.removeChild(element);
      }
    }
  };

  if (!markdownText) {
    return <div className="p-4 text-gray-500">No content available.</div>;
  }

  return (
    <MarkdownErrorBoundary>
      <div className={`relative ${expanded ? "max-h-none" : "max-h-[300px] overflow-hidden"} transition-all`}>
        <ReactMarkdown
          className="prose max-w-none"
          remarkPlugins={[remarkGfm]}
          components={CustomRenderers}
        >
          {markdownText}
        </ReactMarkdown>
      </div>
      
      <div className="flex items-center justify-end mt-2 space-x-3">
        <button
          onClick={toggleBookmark}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
        >
          <svg 
            className="w-5 h-5 text-gray-600" 
            fill={isBookmarked ? "currentColor" : "none"} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
            />
          </svg>
        </button>

        <button
          onClick={handleExportPDF}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          disabled={isExporting}
          aria-label="Export to PDF"
        >
          {isExporting ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          )}
        </button>

        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={expanded ? "Collapse content" : "Expand content"}
        >
          <svg
            className={`w-5 h-5 text-gray-600 transform transition-transform ${
              expanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </MarkdownErrorBoundary>
  );
});

MarkdownComponent.propTypes = {
  markdownText: PropTypes.string.isRequired,
};

export default MarkdownComponent;