import useSWR from 'swr';
import { Experience } from '@/types';

export function useExperiencesSWR() {
    const { data, error, isLoading, mutate } = useSWR<Experience[]>(
        '/portfolio/experiences'
    );

    return {
        experiences: data || [],
        loading: isLoading,
        error: error?.message || null,
        mutate,
    };
}

export function useExperienceSWR(id: number) {
    const { data, error, isLoading, mutate } = useSWR<Experience>(
        id ? `/portfolio/experiences/${id}` : null
    );

    return {
        experience: data || null,
        loading: isLoading,
        error: error?.message || null,
        mutate,
    };
}