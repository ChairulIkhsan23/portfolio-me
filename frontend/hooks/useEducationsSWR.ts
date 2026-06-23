import useSWR from 'swr';
import { Education } from '@/types';

export function useEducationsSWR() {
    const { data, error, isLoading, mutate } = useSWR<Education[]>(
        '/portfolio/education'
    );

    return {
        educations: data || [],
        loading: isLoading,
        error: error?.message || null,
        mutate,
    };
}

export function useEducationSWR(id: number) {
    const { data, error, isLoading, mutate } = useSWR<Education>(
        id ? `/portfolio/education/${id}` : null
    );

    return {
        education: data || null,
        loading: isLoading,
        error: error?.message || null,
        mutate,
    };
}