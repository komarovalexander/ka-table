import React from 'react';

// a value for aria-label: a value rendered as an element doesn't give a text
export const getAriaLabel = (value: any): string | undefined => (
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
