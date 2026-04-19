import { useEffect, useState } from 'react';
import { getProjectBySlug } from '@/lib/api';
import { Project } from '@/types';

export function useProject(slug: string) {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;

        let isMounted = true;

        getProjectBySlug(slug)
            .then((data: Project) => {
                if (isMounted) {
                    setProject(data);
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
    }, [slug]);

    return { project, loading, error };
}