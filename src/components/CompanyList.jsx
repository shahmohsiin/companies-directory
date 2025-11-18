import { memo } from 'react';

/**
 * Individual Company Card - Memoized for Performance
 * Only re-renders when props change
 */
const CompanyCard = memo(({ company, colors }) => {

  const handleViewDetails = () => {
    // Open company website in new tab
    window.open(`https://${company.website}`, '_blank', 'noopener,noreferrer');
  };
  return (
    <div className="glass rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer animate-fadeIn">
      
      {/* Card Header */}
      <div className={`bg-gradient-to-br ${colors.gradient} p-6 text-white`}>
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform border border-white/30">
            <span className="text-white font-bold text-lg">
              {company.name.charAt(0)}
            </span>
          </div>
          
          <span className="px-3 py-1 bg-white/95 text-gray-900 rounded-full text-xs font-bold shadow-sm">
            {company.industry}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:scale-105 transition-transform drop-shadow-sm">
          {company.name}
        </h3>
        
        <p className="text-sm text-white/95 line-clamp-2 drop-shadow-sm">
          {company.description}
        </p>
      </div>

      {/* Card Body */}
      <div className="p-6 bg-white dark:bg-neutral-900">
        <div className="space-y-3">
          
          <div className="flex items-center gap-3 text-sm">
            <div className={`w-8 h-8 ${colors.icon} rounded-lg flex items-center justify-center`}>
              <span>📍</span>
            </div>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              {company.location}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className={`w-8 h-8 ${colors.icon} rounded-lg flex items-center justify-center`}>
              <span>👥</span>
            </div>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              {company.employees} employees
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className={`w-8 h-8 ${colors.icon} rounded-lg flex items-center justify-center`}>
              <span>📅</span>
            </div>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Founded {company.founded}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className={`w-8 h-8 ${colors.icon} rounded-lg flex items-center justify-center`}>
              <span>🌐</span>
            </div>
            <span className="font-semibold hover:underline truncate" style={{ color: 'var(--text-primary)' }}>
              {company.website}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-6 bg-white dark:bg-neutral-900">
        <button onClick={handleViewDetails} className={`w-full py-3 bg-gradient-to-r ${colors.button} text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all`}>
          View Details
        </button>
      </div>
    </div>
  );
});

CompanyCard.displayName = 'CompanyCard';

/**
 * Full Width Company Cards Grid with Infinite Scroll
 * Loads 10 cards at a time for optimal performance
 */
const CompanyList = ({ companies, totalCount, hasMore, onLoadMore }) => {
  
  const colorPalettes = [
    { gradient: 'from-blue-400 to-blue-600', icon: 'bg-blue-50 dark:bg-blue-900/50', button: 'from-blue-500 to-blue-700' },
    { gradient: 'from-purple-400 to-purple-600', icon: 'bg-purple-50 dark:bg-purple-900/50', button: 'from-purple-500 to-purple-700' },
    { gradient: 'from-green-400 to-green-600', icon: 'bg-green-50 dark:bg-green-900/50', button: 'from-green-500 to-green-700' },
    { gradient: 'from-pink-400 to-pink-600', icon: 'bg-pink-50 dark:bg-pink-900/50', button: 'from-pink-500 to-pink-700' },
    { gradient: 'from-amber-400 to-amber-600', icon: 'bg-amber-50 dark:bg-amber-900/50', button: 'from-amber-500 to-amber-700' },
    { gradient: 'from-teal-400 to-teal-600', icon: 'bg-teal-50 dark:bg-teal-900/50', button: 'from-teal-500 to-teal-700' },
    { gradient: 'from-indigo-400 to-indigo-600', icon: 'bg-indigo-50 dark:bg-indigo-900/50', button: 'from-indigo-500 to-indigo-700' },
    { gradient: 'from-rose-400 to-rose-600', icon: 'bg-rose-50 dark:bg-rose-900/50', button: 'from-rose-500 to-rose-700' },
    { gradient: 'from-cyan-400 to-cyan-600', icon: 'bg-cyan-50 dark:bg-cyan-900/50', button: 'from-cyan-500 to-cyan-700' },
    { gradient: 'from-emerald-400 to-emerald-600', icon: 'bg-emerald-50 dark:bg-emerald-900/50', button: 'from-emerald-500 to-emerald-700' }
  ];

  const getColorForCompany = (companyId) => {
    return colorPalettes[companyId % colorPalettes.length];
  };
  
  // Empty state
  if (companies.length === 0) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <div className="glass rounded-3xl p-12 text-center shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              No Companies Found
            </h3>
            <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>
              Try adjusting your filters or search criteria
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-12">
      <div className="w-full">
        
        {/* Results Count */}
        <div className="mb-6 flex items-center gap-2">
          <div className="w-1 h-5 bg-gradient-to-b from-green-500 to-green-700 dark:from-green-400 dark:to-green-500 rounded-full"></div>
          <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
            Showing <span className="text-green-600 dark:text-green-400">{companies.length}</span> of <span className="text-green-600 dark:text-green-400">{totalCount}</span> companies
          </p>
        </div>

        {/* Company Cards Grid - Full Width Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {companies.map((company) => {
            const colors = getColorForCompany(company.id);
            return (
              <CompanyCard 
                key={company.id} 
                company={company} 
                colors={colors}
              />
            );
          })}
        </div>

        {/* Infinite Scroll - Load More Button */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={onLoadMore}
              className="glass px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                  Load More Companies
                </span>
                <svg 
                  className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-y-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
               
              </p>
            </button>
          </div>
        )}

        {/* End of List Message */}
        {!hasMore && companies.length > 0 && (
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full">
              <span className="text-2xl">🎉</span>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                You've viewed all companies!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
