import { useEffect, useState } from 'react';
import { token } from '../config';
import { toast } from 'react-toastify';

const useFetchData = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.message || 'Failed to fetch data');
                }

                setData(result.data);
                toast.success('Data loaded successfully');
            } catch (err) {
                setError(err.message);
                toast.error(err.message);
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        if (url) {  // Only fetch if URL exists
            fetchData();
        }
    }, [url]);

    const refetch = () => {
        if (url) {
            const fetchData = async () => {
                setLoading(true);
                setError(null);

                try {
                    const res = await fetch(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    const result = await res.json();

                    if (!res.ok) {
                        throw new Error(result.message || 'Failed to fetch data');
                    }

                    setData(result.data);
                    toast.success('Data refreshed successfully');
                } catch (err) {
                    setError(err.message);
                    toast.error(err.message);
                    console.error('Fetch error:', err);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    };

    return { data, loading, error, refetch };
};

export default useFetchData;