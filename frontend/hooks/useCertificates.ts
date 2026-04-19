import { useEffect, useState } from 'react';
import { getCertificates } from '@/lib/api';
import { Certificate } from '@/types';

export function useCertificates(limit?: number, category?: string) {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        getCertificates()
            .then((data: Certificate[]) => {
                if (isMounted) {
                    let filtered = data;
                    if (category && category !== 'all') {
                        filtered = data.filter((cert: Certificate) => cert.category === category);
                    }
                    if (limit) {
                        filtered = filtered.slice(0, limit);
                    }
                    setCertificates(filtered);
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
    }, [limit, category]);

    return { certificates, loading, error };
}