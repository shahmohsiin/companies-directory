/**
 * Loading Spinner with Color Psychology (Blue for Trust)
 */
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        {/* Spinner with Blue for Trust/Reliability */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 dark:border-blue-400 rounded-full animate-spin border-t-transparent"></div>
        </div>
        
        <p className="text-gray-900 dark:text-gray-50 font-semibold animate-pulse">
          Loading companies...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
