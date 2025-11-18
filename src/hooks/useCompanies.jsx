import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook to fetch and manage companies data
 * Handles loading states, error handling, and data fetching
 * @returns {Object} - Contains companies array, loading state, and error message
 */
export const useCompanies = () => {
  // State to store the list of companies
  const [companies, setCompanies] = useState([]);
  
  // State to track loading status
  const [loading, setLoading] = useState(true);
  
  // State to store any error messages
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * Fetches companies data from the JSON Server API
     * Updates state based on success or failure
     */
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        
        // API endpoint - update this URL when deploying
        const response = await axios.get('https://my-json-server.typicode.com/shahmohsiin/cd-database/companies');
        
        // Update companies state with fetched data
        setCompanies(response.data);
        setError(null);
        
      } catch (err) {
        // Handle errors during fetch
        setError('Failed to load companies data, Something went wrong Try Reloading !');
        console.error('Error fetching companies:', err);
      } finally {
        // Always set loading to false when done
        setLoading(false);
      }
    };

    // Call the fetch function when component mounts
    fetchCompanies();
  }, []); // Empty dependency array = run once on mount

  return { companies, loading, error };
};
