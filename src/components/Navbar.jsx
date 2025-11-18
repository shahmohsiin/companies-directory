import { useState, useEffect } from 'react';

const Navbar = ({ searchTerm, onSearchChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <nav className="xl:ml-10 xl:mr-10 mt-6 px-4 sm:px-6 lg:px-8 py-4 mb-6">
      <div className="w-full">
        
        <div className=" flex flex-col lg:flex-row items-stretch gap-3">
          
          {/* LEFT - Logo */}
          <div className="  glass rounded-full px-5 sm:px-6 h-[50px] flex items-center gap-3 shrink-0">
            <div className=" w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-700 dark:from-cyan-500 dark:to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">CD</span>
            </div>
            
            <h1 onClick={()=>window.location.replace("/")} className=" cursor-pointer text-base sm:text-lg font-bold text-gray-900 dark:text-cyan-300 whitespace-nowrap">
              Companies Directory
            </h1>
          </div>

          {/* RIGHT - Search & Toggle */}
          <div className="flex gap-3 flex-1">
            
            {/* MIDDLE - Search (takes remaining space) */}
            <div className="glass rounded-full px-4 sm:px-6 h-[50px] flex items-center gap-3 flex-1 min-w-0">
              <svg 
                className="w-5 h-5 text-blue-600 dark:text-cyan-400 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
              
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none min-w-0 text-sm sm:text-base font-medium text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              
              {searchTerm && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="text-gray-600 dark:text-cyan-400 hover:text-gray-900 dark:hover:text-cyan-300 flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* RIGHT - Toggle (fixed width, won't shrink) */}
            <div className="glass rounded-full px-3 h-[50px] flex items-center justify-center shrink-0 w-[80px]">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="relative w-12 h-6 bg-gray-300 dark:bg-gradient-to-r dark:from-blue-600 dark:to-cyan-600 rounded-full transition-all duration-300"
              >
                <div 
                  className={`absolute top-0.5 w-5 h-5 bg-white dark:bg-cyan-300 rounded-full shadow-lg transform transition-all duration-300 flex items-center justify-center ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                >
                  <span className="text-xs">{isDarkMode ? '🌙' : '☀️'}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
