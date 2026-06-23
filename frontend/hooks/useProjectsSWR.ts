import useSWR from 'swr';
import { Project } from '@/types';

export function useProjectsSWR(categoryId?: number) {
    const params = new URLSearchParams();
    if (categoryId) params.append('category_id', String(categoryId));

    const url = `/portfolio/projects?${params.toString()}`;

    const { data, error, isLoading, mutate } = useSWR<Project[]>(url);

    return {
        projects: data || [],
        loading: isLoading,
        error: error?.message || null,
        mutate,
    };
}

export function useProjectSWR(slug: string) {
    const { data, error, isLoading, mutate } = useSWR<Project>(
        slug ? `/portfolio/projects/${slug}` : null
    );

    return {
        project: data || null,
        loading: isLoading,
        error: error?.message || null,
        mutate,
    };
}