import * as React from 'react';

import { KeyboardEnum } from '../enums';

// useLayoutEffect warns during server rendering
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/*
  Used inside effects and returned as result from them,
  it adds listener to esc & enter keys on life cycle of component
*/
export const addEscEnterKeyEffect = (escKeyHandler: () => void, enterKeyHandler: () => void) => {
    const handleKeyboard = (event: KeyboardEvent) => {
        if (event.keyCode === KeyboardEnum.Esc) {
            escKeyHandler();
        }

        if (event.keyCode === KeyboardEnum.Enter) {
            enterKeyHandler();
        }
    };
    return getEventListenerEffect('keyup', handleKeyboard);
};

export const getEventListenerEffect = (eventName: string, handler: any) => {
    window.addEventListener(eventName, handler);

    return () => {
        window.removeEventListener(eventName, handler);
    };
};
