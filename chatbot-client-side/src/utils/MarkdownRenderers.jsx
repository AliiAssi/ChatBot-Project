import PropTypes from 'prop-types';

export const CustomRenderers = {
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

// PropTypes definition (optional)
export const rendererPropTypes = {
  node: PropTypes.object,
  children: PropTypes.node,
  inline: PropTypes.bool,
  className: PropTypes.string,
};