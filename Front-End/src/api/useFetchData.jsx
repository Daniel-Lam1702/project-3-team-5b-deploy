import { useState, useEffect, useCallback } from 'react';
import { getData } from './apiService';

/**
 * Custom hook to fetch data from a specified endpoint with a refetch capability.
 * 
 * @param {string} endpoint - The endpoint to fetch data from (appended to the base URL).
 * @returns {object} - An object containing:
 *   - `data`: The fetched data (initially null until data is loaded).
 *   - `loading`: A boolean indicating if the request is in progress.
 *   - `error`: An error object if the request fails (initially null).
 *   - `refetch`: A function to manually refetch the data.
 * 
 * Usage:
 *   const { data, loading, error, refetch } = useFetchData('menu-items');
 */
export const useFetchData = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getData(endpoint);
            setData(result);
            setError(null); // Reset error state on successful fetch
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    // Automatically fetch data on hook initialization
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};
