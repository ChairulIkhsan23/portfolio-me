import { useEffect, useState } from 'react';
import { getExperiences } from '@/lib/api';
import { Experience } from '@/types';

export function useExperiences() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        getExperiences()
            .then((data: Experience[]) => {
                if (isMounted) setExperiences(data);
            })
            .catch((err: Error) => {
                if (isMounted) setError(err.message);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });
        return () => { isMounted = false; };
    }, []);

    return { experiences, loading, error };
}