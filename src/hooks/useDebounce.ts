import {useCallback, useEffect, useRef} from "react";

export function useDebounce<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): [(...args: any[]) => Promise<ReturnType<T>>, () => void] {

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const callbackRef = useRef(callback);

    // Keep the latest callback reference
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    // Cleanup timeout on unmounting
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Debounced function
    const debouncedFunction = useCallback(
        (...args: any[]): Promise<ReturnType<T>> => {
            return new Promise<ReturnType<T>>((resolve) => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                timeoutRef.current = setTimeout(async () => {
                    resolve(await callbackRef.current(...args));
                }, delay);
            });
        },
        [delay]
    );

    // Cancel function
    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    return [debouncedFunction, cancel];
}
