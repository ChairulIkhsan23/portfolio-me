import { useEffect, useState } from 'react';
import { getProjects } from '@/lib/api';
import { Project } from '@/types';

export function useProjects(limit?: number) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        getProjects()
            .then((data: Project[]) => {
                if (isMounted) {
                    if (limit) {
                        setProjects(data.slice(0, limit));
                    } else {
                        setProjects(data);
                    }
                    setLoading(false);
                }
            })
            .catch((err: Error) => {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [limit]);

    return { projects, loading, error };
}