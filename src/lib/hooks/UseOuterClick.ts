import React from 'react';

export const useOuterClick = (callback: () => void) => {
    const callbackRef = React.useRef((event: MouseEvent) => { });
    const innerRef = React.useRef<HTMLDivElement>(document.createElement('div'));

    React.useEffect(() => {
        callbackRef.current = callback;
    });
    React.useEffect(() => {
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
