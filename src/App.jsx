import { useState, useMemo, useCallback } from 'react';
import { useCompanies } from './hooks/useCompanies'
import Navbar from './components/Navbar';
import FilterControls from './components/FilterControls';
import CompanyList from './components/CompanyList';
import LoadingSpinner from './components/LoadingSpinner';

/**
 * Main App Component with Infinite Scroll & Performance Optimization
 * Uses memoization to prevent unnecessary re-renders
 */
const App = () => {
  const { companies, loading, error } = useCompanies();

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [displayCount, setDisplayCount] = useState(10); // Initial load: 10 cards

  // Memoized unique industries - prevents recalculation on every render
  const industries = useMemo(() => {
    const uniqueIndustries = [...new Set(companies.map(company => company.industry))];
    return uniqueIndustries.sort();
  }, [companies]);

  // Memoized unique locations
  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(companies.map(company => company.location))];
    return uniqueLocations.sort();
  }, [companies]);

  // Memoized filtered companies - only recalculates when dependencies change
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesIndustry =
        selectedIndustry === 'All' || company.industry === selectedIndustry;

      const matchesLocation =
        selectedLocation === 'All' || company.location === selectedLocation;

      return matchesSearch && matchesIndustry && matchesLocation;
    });
  }, [companies, searchTerm, selectedIndustry, selectedLocation]);

  // Memoized displayed companies - only show the first 'displayCount' cards
  const displayedCompanies = useMemo(() => {
    return filteredCompanies.slice(0, displayCount);
  }, [filteredCompanies, displayCount]);

  // Callback for loading more cards - prevents function recreation
  const loadMore = useCallback(() => {
    setDisplayCount(prev => prev + 10); // Load 10 more cards
  }, []);

  // Callback for search change - optimized with useCallback
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
    setDisplayCount(10); // Reset to 10 when searching
  }, []);

  // Callback for industry change
  const handleIndustryChange = useCallback((value) => {
    setSelectedIndustry(value);
    setDisplayCount(10); // Reset to 10 when filtering
  }, []);

  // Callback for location change
  const handleLocationChange = useCallback((value) => {
    setSelectedLocation(value);
    setDisplayCount(10); // Reset to 10 when filtering
  }, []);

  // Check if there are more cards to load
  const hasMore = displayCount < filteredCompanies.length;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="glass rounded-3xl p-8 max-w-md shadow-xl">
          <div className="text-4xl mb-4 text-center">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2 text-center">Error</h2>
          <p className="text-gray-700 dark:text-gray-300 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      
      {/* Navbar */}
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {/* Filter Controls */}
      <FilterControls
        industries={industries}
        locations={locations}
        selectedIndustry={selectedIndustry}
        selectedLocation={selectedLocation}
        onIndustryChange={handleIndustryChange}
        onLocationChange={handleLocationChange}
      />

      {/* Company Cards List */}
      <CompanyList 
        companies={displayedCompanies}
        totalCount={filteredCompanies.length}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </div>
  );
};

export default App;
