import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

function ChatWindowHeader({ onClose, onShowBookmarks, conversation }) {
  console.log(conversation);
  const [isBookmarksVisible, setIsBookmarksVisible] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setBookmarks(savedBookmarks);
    } catch (error) {
      console.error("Failed to parse bookmarks:", error);
      setBookmarks([]);
    }
  }, [isBookmarksVisible]);

  const handleDeleteBookmark = (index, e) => {
    e.stopPropagation();
    const newBookmarks = bookmarks.filter((_, i) => i !== index);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  };

  const handleExportToWord = async () => {
    if (!conversation?.length) {
      alert('No conversation to export!');
      return;
    }
    // Create document content with proper message structure
    const doc = new Document({
      sections: [{
        properties: {},
        children: conversation.map(message => new Paragraph({
          children: [
            new TextRun({
              text: `${message.isBot ? 'AI' : 'User'}: ${message.text}`,
              bold: !message.isBot, // Bold user messages
              color: message.isError ? 'FF0000' : undefined, // Red for errors
              break: 1
            })
          ]
        }))
      }]
    });
  
    // Generate and download the file
    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `conversation_${Date.now()}.docx`);
    });
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div 
            className="h-2 w-2 bg-green-500 rounded-full animate-pulse"
            aria-label="Connection status indicator"
            title="Online"
          />
          <h3 className="font-semibold text-gray-800 text-lg">Uni Chat</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsBookmarksVisible(!isBookmarksVisible)}
            className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="Show bookmarks"
            aria-expanded={isBookmarksVisible}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
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
            onClick={handleExportToWord}
            className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="Export to Word"
            title="Export conversation"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="Close chat window"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Bookmarks Overlay */}
      {isBookmarksVisible && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsBookmarksVisible(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[70vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                Saved Bookmarks ({bookmarks.length})
              </h3>
              <button
                onClick={() => setIsBookmarksVisible(false)}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Close bookmarks"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            <div className="overflow-y-auto p-4">
              {bookmarks.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No bookmarks saved yet
                </p>
              ) : (
                <ul className="space-y-2">
                  {bookmarks.map((bookmark, index) => (
                    <li
                      key={index}
                      className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group relative"
                      onClick={() => {
                        onShowBookmarks(bookmark);
                        setIsBookmarksVisible(false);
                      }}
                    >
                      <div 
                        className="text-gray-800 line-clamp-2"
                        title={bookmark}
                      >
                        {bookmark}
                      </div>
                      <button
                        onClick={(e) => handleDeleteBookmark(index, e)}
                        className="absolute right-2 top-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-full hover:bg-gray-200"
                        aria-label="Delete bookmark"
                      >
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

ChatWindowHeader.propTypes = {
  conversation: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isBot: PropTypes.bool.isRequired,
      isError: PropTypes.bool,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onShowBookmarks: PropTypes.func.isRequired,
};

export default ChatWindowHeader;