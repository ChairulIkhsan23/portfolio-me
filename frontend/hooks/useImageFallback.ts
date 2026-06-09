import { useState } from 'react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600';

export function useImageFallback(initialSrc: string) {
    const [imageSrc, setImageSrc] = useState(initialSrc);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            setImageSrc(FALLBACK_IMAGE);
        }
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    return {
        imageSrc,
        hasError,
        isLoading,
        handleError,
        handleLoad,
    };
}