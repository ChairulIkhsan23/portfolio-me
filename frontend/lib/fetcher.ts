import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-portfolio.chairulikhsanworks.my.id/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

export const fetcher = async (url: string) => {
    const response = await api.get(url);
    return response.data.data;
};

export const fetcherWithPagination = async (url: string) => {
    const response = await api.get(url);
    return response.data;
};

export default api;