import { useEffect, useState } from 'react';
import { getEducations } from '@/lib/api';
import { Education } from '@/types';

export function useEducations() {
    const [educations, setEducations] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        getEducations()
            .then((data: Education[]) => {
                if (isMounted) setEducations(data);
            })
            .catch((err: Error) => {
                if (isMounted) setError(err.message);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });
        return () => { isMounted = false; };
    }, []);

    return { educations, loading, error };
}