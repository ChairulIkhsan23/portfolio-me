import useSWR from 'swr';
import { Certificate } from '@/types';
import { fetcherWithPagination } from '@/lib/fetcher';

interface CertificatesResponse {
    data: Certificate[];
    pagination: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
        from: number;
        to: number;
    };
}

export function useCertificatesSWR(categoryId?: number, perPage: number = 12, page: number = 1) {
    const params = new URLSearchParams();
    if (categoryId) params.append('category_id', String(categoryId));
    params.append('per_page', String(perPage));
    params.append('page', String(page));

    const url = `/portfolio/certificates?${params.toString()}`;

    const { data, error, isLoading, mutate } = useSWR<CertificatesResponse>(
        url,
        fetcherWithPagination,
        {
            keepPreviousData: true,
        }
    );

    return {
        certificates: data?.data || [],
        pagination: data?.pagination || {
            total: 0,
            per_page: 12,
            current_page: 1,
            last_page: 1,
            from: 0,
            to: 0,
        },
        loading: isLoading,
        error: error?.message || null,
        mutate,
    };
}