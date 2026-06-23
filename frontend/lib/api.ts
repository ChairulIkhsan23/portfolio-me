import { MessageForm } from '@/types';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-portfolio.chairulikhsanworks.my.id/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProjects = async (categoryId?: number) => {
    const params = new URLSearchParams();
    if (categoryId) params.append('category_id', String(categoryId));

    const response = await api.get(`/portfolio/projects?${params.toString()}`);
    return response.data.data;
};

export const getProjectBySlug = async (slug: string) => {
    const response = await api.get(`/portfolio/projects/${slug}`);
    return response.data.data;
};

export const getExperiences = async () => {
    const response = await api.get('/portfolio/experiences');
    return response.data.data;
};

export const getExperienceById = async (id: number) => {
    const response = await api.get(`/portfolio/experiences/${id}`);
    return response.data.data;
};

export const getEducations = async () => {
    const response = await api.get('/portfolio/education');
    return response.data.data;
};

export const getEducationById = async (id: number) => {
    const response = await api.get(`/portfolio/education/${id}`);
    return response.data.data;
};

export const getCertificates = async (categoryId?: number, perPage = 12) => {
    const params = new URLSearchParams();
    if (categoryId) params.append('category_id', String(categoryId));
    params.append('per_page', String(perPage));

    const response = await api.get(`/portfolio/certificates?${params.toString()}`);
    return response.data;
};

export const getCertificateById = async (id: number) => {
    const response = await api.get(`/portfolio/certificates/${id}`);
    return response.data.data;
};

export const sendMessage = async (data: MessageForm) => {
    const response = await api.post('/messages', data);
    return response.data;
};

export default api;