
import { useEffect, useState } from "react";

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

function useFetch<T>(url: string): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(url, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result: T = await response.json();
                setData(result);
            } catch (err) {
                if (err instanceof Error && err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => controller.abort();
    }, [url]);

    return { data, loading, error };
}

export default useFetch;
