import React from 'react';

// a value for aria-label: a value rendered as an element doesn't give a text
export const getAriaLabel = (value: unknown): string | undefined => (
    (typeof value === 'string' && value !== '') || typeof value === 'number' ? `${value}` : undefined
);

/**
 * Attributes of an element which works as a button: it gets the focus by Tab
 * and is clicked by Enter (on keydown) and Space (on keyup) like a native button.
 * The elements keep their tags, so their look doesn't depend on styles of buttons.
 */
export const buttonAttributes = {
    role: 'button',
    tabIndex: 0,
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.currentTarget.click();
        } else if (event.key === ' ') {
            // the page is not scrolled
            event.preventDefault();
        }
    },
    onKeyUp: (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === ' ') {
            event.preventDefault();
            event.currentTarget.click();
        }
    },
};

let lastIdIndex = 0;
// an id without React.useId (React 16 and 17): a counter
const useCounterId = (): string => React.useState(() => `ka-id-${++lastIdIndex}`)[0];

/**
 * A unique id for the aria attributes (aria-describedby...): React.useId keeps the ids of the server rendering,
 * the versions of React without it get a counter
 */
export const useAriaId: () => string = (React as { useId?: () => string }).useId || useCounterId;

const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(', ');

export const getFocusableElements = (container: HTMLElement | null): HTMLElement[] => (
    container ? Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)) : []
);
