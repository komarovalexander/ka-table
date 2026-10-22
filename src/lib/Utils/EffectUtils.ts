import * as React from 'react';

import { KeyboardEnum } from '../enums';

// useLayoutEffect warns during server rendering
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/*
  Used inside effects and returned as result from them,
  it adds listener to esc & enter keys of the target (the window by default) on life cycle of component
*/
export const addEscEnterKeyEffect = (escKeyHandler: () => void, enterKeyHandler: () => void, target: EventTarget = window) => {
    const handleKeyboard = (event: KeyboardEvent) => {
        if (event.key === 'Escape' || event.keyCode === KeyboardEnum.Esc) {
            escKeyHandler();
        }

        if (event.key === 'Enter' || event.keyCode === KeyboardEnum.Enter) {
            enterKeyHandler();
        }
    };
    return getEventListenerEffect('keyup', handleKeyboard, target);
};

// the handler gets the events of its type, e.g. MouseEvent of mousemove
export const getEventListenerEffect = <E extends Event>(eventName: string, handler: (event: E) => void, target: EventTarget = window) => {
    // the listeners of EventTarget are typed with Event
    const listener = handler as EventListener;
    target.addEventListener(eventName, listener);

    return () => {
        target.removeEventListener(eventName, listener);
    };
};
