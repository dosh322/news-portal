import { useCallback, useRef } from "react";

/**
 * Хук, который позволяет отменять предыдущий вызов функции пока не истечет delay
 *
 * @param callback
 * @param {number} delay
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any[]) => void>(
    callback: T,
    delay: number,
) {
    const timer = useRef<NodeJS.Timeout | null>(null);

    return useCallback(
        (...args: Parameters<T>) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );
}
