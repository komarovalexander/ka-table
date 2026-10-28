import { act, fireEvent, render } from '@testing-library/react';

import HeadCellResize from './HeadCellResize';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props = {
    column: {
        key: 'column1',
        width: 100
    },
    dispatch: vi.fn(),
    childComponents: {}
};

describe('HeadCellResize', () => {
    beforeEach(() => {
        props.dispatch.mockClear();
    });
    it('renders without crashing', () => {
        const element = document.createElement('div');
        const root = createRoot(element!);
        act(() => {
            root.render(<HeadCellResize  {...props} />);
        });
        act(() => {
            root.unmount();
        });
    });

    it('should handle onMouseDown correctly', () => {
        const { container } = render(<HeadCellResize {...props} />);
        const isDefaultAllowed = fireEvent.mouseDown(container.querySelector('.ka-thead-cell-resize')!, { screenX: 100 });
        expect(isDefaultAllowed).toBe(false);
        expect(props.dispatch).toHaveBeenCalledTimes(0);
        fireEvent.mouseMove(document.body, { screenX: 120 });
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenLastCalledWith({ columnKey: 'column1', type: 'ResizeColumn', width: 120 });
        fireEvent.mouseUp(document.body, { screenX: 130 });
        expect(props.dispatch).toHaveBeenCalledTimes(2);
        expect(props.dispatch).toHaveBeenLastCalledWith({ columnKey: 'column1', type: 'ResizeColumn', width: 130 });
    });

    it('should use parentWidth for resizing', () => {
        const { container } = render(
            <HeadCellResize {...props} column={{
                key: 'column1',
                style: {
                    width: '20%'
                }
            }} />
        );
        Object.defineProperty(container, 'offsetWidth', { configurable: true, value: 80 });
        fireEvent.mouseDown(container.querySelector('.ka-thead-cell-resize')!, { screenX: 80 });
        fireEvent.mouseUp(document.body, { screenX: 90 });
        expect(props.dispatch.mock.calls[0]).toEqual([{columnKey: 'column1', type: 'ResizeColumn', width: 90}]);
    });

    it('should use column.width for resizing', () => {
        const { container } = render(<HeadCellResize {...props} />);
        fireEvent.mouseDown(container.querySelector('.ka-thead-cell-resize')!, { screenX: 150 });
        fireEvent.mouseUp(document.body, { screenX: 160 });
        expect(props.dispatch.mock.calls[0]).toEqual([{columnKey: 'column1', type: 'ResizeColumn', width: 110}]);
    });

    it('keeps the min width of colGroup.style', () => {
        const { container } = render(<HeadCellResize {...props} column={{ key: 'column1', width: 200, colGroup: { style: { minWidth: 100 } } }} />);
        fireEvent.mouseDown(container.querySelector('.ka-thead-cell-resize')!, { screenX: 300 });
        fireEvent.mouseMove(document.body, { screenX: 150 });
        expect(props.dispatch).toHaveBeenLastCalledWith({ columnKey: 'column1', type: 'ResizeColumn', width: 100 });
        fireEvent.mouseUp(document.body, { screenX: 150 });
        expect(props.dispatch).toHaveBeenLastCalledWith({ columnKey: 'column1', type: 'ResizeColumn', width: 100 });
    });
});
