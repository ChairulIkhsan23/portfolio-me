'use client';

import { SWRConfig } from 'swr';
import { fetcher } from '@/lib/fetcher';
import { swrConfig } from '@/lib/swr-config';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SWRConfig
            value={{
                ...swrConfig,
                fetcher,
            }}
        >
            {children}
        </SWRConfig>
    );
}