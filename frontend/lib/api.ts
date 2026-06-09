import { MessageForm } from '@/types';
import axios from 'axios';

// Hybrid: Prioritaskan environment variable, fallback ke hardcode
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-portfolio.chairulikhsanworks.my.id/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Projects
export const getProjects = async () => {
    const response = await api.get('/projects');
    return response.data.data;
};

export const getProjectBySlug = async (slug: string) => {
    const response = await api.get(`/projects/${slug}`);
    return response.data.data;
};

// Experiences
export const getExperiences = async () => {
    const response = await api.get('/experiences');
    return response.data.data;
};

// Educations
export const getEducations = async () => {
    const response = await api.get('/educations');
    return response.data.data;
};

// Certificates
export const getCertificates = async () => {
    const response = await api.get('/certificates');
    return response.data.data;
};

export const getFeaturedCertificates = async (limit = 6) => {
    const response = await api.get(`/certificates/featured?limit=${limit}`);
    return response.data.data;
};

// Messages
export const sendMessage = async (data: MessageForm) => {
    const response = await api.post('/messages', data);
    return response.data;
};

export default api;