import { useCallback, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useThrottle = <T extends (...args: any[]) => void>(cb: T, delay: number) => {
    const throttleRef = useRef(false);

    return useCallback(
        (...args: Parameters<T>) => {
            if (!throttleRef.current) {
                cb(...args);
                throttleRef.current = true;

                setTimeout(() => {
                    throttleRef.current = false;
                }, delay);
            }
        },
        [delay, cb],
    );
};
