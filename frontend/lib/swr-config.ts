import { SWRConfiguration } from 'swr';

export const swrConfig: SWRConfiguration = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
    refreshInterval: 300000,
    keepPreviousData: true,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
};