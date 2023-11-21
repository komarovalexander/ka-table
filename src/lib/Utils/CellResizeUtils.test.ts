
import { getMinWidth, getMouseMove, getValidatedWidth, isCellResizeShown } from './CellResizeUtils';

describe('CellUtils', () => {
    describe('getMinWidth', () => {
        it('default', () => {
            expect(getMinWidth({})).toBe(20);
        });
        it('should get value from minWidth', () => {
            expect(getMinWidth({ minWidth: 200 })).toBe(200);
        });
        it('should skip minWidth in case of percents', () => {
            expect(getMinWidth({ minWidth: '100%' })).toBe(20);
        });
    });
    describe('getValidatedWidth', () => {
        it('newWidth less than minWidth', () => {
            expect(getValidatedWidth(20, 40)).toBe(40);
        });
        it('newWidth more than minWidth', () => {
            expect(getValidatedWidth(50, 40)).toBe(50);
        });
    });
    describe('getMouseMove', () => {
        it('default', () => {
            const dispatch = jest.fn();
            const mouseMoveEvent = getMouseMove(40, 50, 100, 'column1', dispatch);
            mouseMoveEvent({ screenX: 20 } as any);
            expect(dispatch).toBeCalledWith({type: 'ResizeColumn', columnKey: 'column1', width: 50});
        });
        it('skip', () => {
            const dispatch = jest.fn();
            const mouseMoveEvent = getMouseMove(40, 40, 0, 'column1', dispatch);
            mouseMoveEvent({ screenX: 40 } as any);
            expect(dispatch).toHaveBeenCalledTimes(0);
        });
    });

    it('isCellResizeShown', () => {
        expect(isCellResizeShown(false, false)).toBeFalsy();
        expect(isCellResizeShown(false, true)).toBeFalsy();
        expect(isCellResizeShown(false, undefined)).toBeFalsy();
        expect(isCellResizeShown(true, false)).toBeTruthy();
        expect(isCellResizeShown(true, false)).toBeTruthy();
        expect(isCellResizeShown(true, undefined)).toBeTruthy();
        expect(isCellResizeShown(undefined, true)).toBeTruthy();
        expect(isCellResizeShown(undefined, false)).toBeFalsy();
        expect(isCellResizeShown(undefined, undefined)).toBeFalsy();
    });
});
