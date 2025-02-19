import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Error Boundary to catch and display errors during markdown rendering.
 */
class MarkdownErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error rendering markdown:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-600">
          Something went wrong while rendering the markdown.
        </div>
      );
    }
    return this.props.children;
  }
}

MarkdownErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom renderers for markdown elements with Tailwind CSS classes.
 */
const CustomRenderers = {
  h1: ({ node, ...props }) => (
    <h1 className="text-3xl font-bold mb-4" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="text-2xl font-semibold mb-3" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="text-xl font-medium mb-2" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p className="mb-4 leading-relaxed" {...props} />
  ),
  a: ({ node, ...props }) => (
    <a className="text-blue-600 hover:text-blue-800 underline" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul className="list-disc pl-6 mb-4" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="list-decimal pl-6 mb-4" {...props} />
  ),
  li: ({ node, ...props }) => <li className="mb-2" {...props} />,
  code: ({ node, inline, children, ...props }) =>
    inline ? (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-red-600" {...props}>
        {children}
      </code>
    ) : (
      <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto my-4" {...props}>
        {children}
      </pre>
    ),
  blockquote: ({ node, ...props }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
  ),
  table: ({ node, ...props }) => (
    <table className="w-full border-collapse my-4" {...props} />
  ),
  th: ({ node, ...props }) => (
    <th className="bg-gray-100 text-left p-2 border border-gray-300" {...props} />
  ),
  td: ({ node, ...props }) => (
    <td className="p-2 border border-gray-300" {...props} />
  ),
  img: ({ node, ...props }) => (
    <img className="rounded-lg my-4 max-w-full h-auto" alt="" {...props} />
  ),
  hr: ({ node, ...props }) => (
    <hr className="my-6 border-t border-gray-200" {...props} />
  ),
};

/**
 * MarkdownComponent with collapsible content for large messages.
 */
const MarkdownComponent = memo(function MarkdownComponent({ markdownText }) {
  const [expanded, setExpanded] = useState(false);

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
      <div className="text-center mt-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 hover:underline"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </MarkdownErrorBoundary>
  );
});

MarkdownComponent.propTypes = {
  markdownText: PropTypes.string.isRequired,
};

export default MarkdownComponent;
