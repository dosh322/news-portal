import { ImgHTMLAttributes, ReactElement, useLayoutEffect, useState } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

export function AppImage({
    className,
    src,
    alt = "image",
    fallback,
    errorFallback,
    ...imgProps
}: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? "";
        img.onload = () => {
            setIsLoading(false);
            setHasError(false);
        };
        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if (isLoading && fallback) {
        return fallback;
    }

    if (hasError && errorFallback) {
        return errorFallback;
    }

    return <img src={src} alt={alt} className={className} {...imgProps} />;
}
