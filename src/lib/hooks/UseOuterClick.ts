import { useEffect, useRef } from 'react';

export const useOuterClick = (callback: () => void) => {
    const callbackRef = useRef<(event: MouseEvent) => void>(() => { });
    const innerRef = useRef<HTMLDivElement>(document.createElement('div'));

    useEffect(() => {
        callbackRef.current = callback;
    });
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (innerRef.current && callbackRef.current &&
                !innerRef.current.contains(event.target as Node)
            )
                callbackRef.current(event);
        }
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);

    }, []);
    return innerRef;
}
