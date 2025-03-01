const LoadingIndicator = () => (
  <div 
    className="flex items-center justify-center space-x-2"
    role="status"
    aria-live="polite"
    aria-label="Loading"
  >
    <div className="flex space-x-1.5">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-2.5 h-2.5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full
                    animate-[pulse_1.2s_ease-in-out_infinite]"
          style={{ 
            animationDelay: `${i * 150}ms`,
            transformOrigin: 'center'
          }}
        />
      ))}
    </div>
  </div>
);

export default LoadingIndicator;