import { useState, useEffect } from 'react';
import { getData } from './apiService';
/**
 * Custom hook to fetch data from a specified endpoint.
 * 
 * @param {string} endpoint - The endpoint to fetch data from (appended to the base URL).
 * @returns {object} - An object containing:
 *   - `data`: The fetched data (initially null until data is loaded).
 *   - `loading`: A boolean indicating if the request is in progress.
 *   - `error`: An error object if the request fails (initially null).
 * 
 * Usage:
 *   const { data, loading, error } = useFetchData('menu-items');
 * 
 * This hook automatically sets the `baseUrl` to a local server if running in a local environment
 * or uses the environment variable `POS_API_BASE_URL` for other environments.
 */
export const useFetchData = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await getData(endpoint);
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
};
