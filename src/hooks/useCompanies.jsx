import { useState, useEffect } from 'react';
import axios from 'axios';
const Base_URL = import.meta.env.VITE_BASE_URL

/**
 * Custom hook to fetch and manage companies data
 * Handles loading states, error handling, and data fetching
 * @returns {Object} - Contains companies array, loading state, and error message
 */
export const useCompanies = () => {
  

  const [companies, setCompanies] = useState([]);
  

  const [loading, setLoading] = useState(true);
  

  const [error, setError] = useState(null);

  useEffect(() => {
  
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        
      
        const response = await axios.get(Base_URL);
        
        // Update companies state with fetched data
        setCompanies(response.data);
        setError(null);
        
      } catch (err) {
        setError('Failed to load companies data, Something went wrong Try Reloading !');
        console.error('Error fetching companies:', err);
      } finally {

        setLoading(false);
      }
    };

    // Call the fetch function when component mounts
    fetchCompanies();
  }, []); 

  return { companies, loading, error };
};
