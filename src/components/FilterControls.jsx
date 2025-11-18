const FilterControls = ({
  industries,
  locations,
  selectedIndustry,
  selectedLocation,
  onIndustryChange,
  onLocationChange
}) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-6">
      <div className="w-full">
        <div className="glass rounded-[40px] px-6 sm:px-8 py-6">
          
          <div className="mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-purple-700 dark:from-purple-400 dark:to-pink-500 rounded-full"></div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-purple-300">
              Filter Options
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Industry */}
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-cyan-200">
                🏭 Industry
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => onIndustryChange(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-cyan-500/40 rounded-xl cursor-pointer font-semibold text-gray-900 dark:text-white"
              >
                {/* FIX: Add value="All" here */}
                <option value="All">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-blue-200">
                📍 Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => onLocationChange(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-blue-500/40 rounded-xl cursor-pointer font-semibold text-gray-900 dark:text-white"
              >
                {/* FIX: Add value="All" here */}
                <option value="All">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Badges */}
          {(selectedIndustry !== 'All' || selectedLocation !== 'All') && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedIndustry !== 'All' && (
                <span className="px-4 py-1.5 bg-teal-100 dark:bg-cyan-900 text-teal-900 dark:text-cyan-200 rounded-full text-sm font-bold border-2 border-teal-300 dark:border-cyan-500">
                  {selectedIndustry}
                </span>
              )}
              {selectedLocation !== 'All' && (
                <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-200 rounded-full text-sm font-bold border-2 border-blue-300 dark:border-blue-500">
                  {selectedLocation}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
