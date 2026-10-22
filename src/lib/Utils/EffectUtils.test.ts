import { KeyboardEnum } from '../enums';
import { addEscEnterKeyEffect, getEventListenerEffect } from './EffectUtils';

describe('EffectUtils', () => {
    it('getEventListenerEffect', () => {
        const handler = vi.fn();
        const addEventListenerMock = vi.fn();
        const removeEventListenerMock = vi.fn();

        window.addEventListener = addEventListenerMock;
        window.removeEventListener = removeEventListenerMock;

        const unsubscribeFunc = getEventListenerEffect('keyup', handler);

        expect(addEventListenerMock.mock.calls.length).toBe(1);
        expect(removeEventListenerMock.mock.calls.length).toBe(0);

        unsubscribeFunc();

        expect(addEventListenerMock.mock.calls.length).toBe(1);
        expect(removeEventListenerMock.mock.calls.length).toBe(1);
    });

    it('addEscEnterKeyEffect', () => {
        const escKeyHandler = vi.fn();
        const enterKeyHandler = vi.fn();
        let keyPressFunc: any;
        const addEventListenerMock = vi.fn((event, fn) => {
            keyPressFunc = fn;
        });
        window.addEventListener = addEventListenerMock;

        addEscEnterKeyEffect(escKeyHandler, enterKeyHandler);

        keyPressFunc({ keyCode: KeyboardEnum.Esc });

        expect(escKeyHandler.mock.calls.length).toBe(1);
        expect(enterKeyHandler.mock.calls.length).toBe(0);

        keyPressFunc({ keyCode: KeyboardEnum.Enter });

        expect(escKeyHandler.mock.calls.length).toBe(1);
        expect(enterKeyHandler.mock.calls.length).toBe(1);

        keyPressFunc({ keyCode: 10 });

        expect(escKeyHandler.mock.calls.length).toBe(1);
        expect(enterKeyHandler.mock.calls.length).toBe(1);
    });

    it('addEscEnterKeyEffect handles the keys of the target', () => {
        const escKeyHandler = vi.fn();
        const enterKeyHandler = vi.fn();
        const target = document.createElement('tr');
        const child = target.appendChild(document.createElement('td'));
        const removeEffect = addEscEnterKeyEffect(escKeyHandler, enterKeyHandler, target);

        child.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape', bubbles: true }));
        target.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
        expect(escKeyHandler).toHaveBeenCalledTimes(1);
        expect(enterKeyHandler).toHaveBeenCalledTimes(1);

        removeEffect();
        target.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
        expect(escKeyHandler).toHaveBeenCalledTimes(1);
    });
});
