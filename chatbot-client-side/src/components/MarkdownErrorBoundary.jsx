import React from 'react';
import PropTypes from 'prop-types';

export class MarkdownErrorBoundary extends React.Component {
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