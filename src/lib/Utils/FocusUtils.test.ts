import { focusCell, getVisibleArea, scrollCellIntoVisibleArea } from './FocusUtils';

describe('FocusUtils', () => {
    // a wrapper of 300 x 200 at (0, 0) with a sticky header of 40px, a fixed left column of 100px, a fixed right column of 50px,
    // the scrolling moves the rects of the cells
    const layout = () => {
        document.body.innerHTML = `
            <div class="ka-table-wrapper">
                <table>
                    <thead><tr><th style="position: sticky">Header</th></tr></thead>
                    <tbody>
                        <tr>
                            <td class="ka-fixed-left" style="position: sticky">fixed left</td>
                            <td id="cell">cell</td>
                            <td class="ka-fixed-right" style="position: sticky">fixed right</td>
                        </tr>
                        <tr><td id="group" colspan="3">group</td></tr>
                    </tbody>
                </table>
            </div>`;
        const wrapper = document.querySelector<HTMLElement>('.ka-table-wrapper')!;
        const cell = document.querySelector<HTMLTableCellElement>('#cell')!;
        const group = document.querySelector<HTMLTableCellElement>('#group')!;
        Object.defineProperty(wrapper, 'clientWidth', { value: 300 });
        Object.defineProperty(wrapper, 'clientHeight', { value: 200 });
        const rect = (left: number, top: number, width: number, height: number) => () =>
            ({ left, top, width, height, right: left + width, bottom: top + height } as DOMRect);
        wrapper.getBoundingClientRect = rect(0, 0, 300, 200);
        document.querySelector('thead')!.getBoundingClientRect = rect(0, 0, 300, 40);
        document.querySelector('.ka-fixed-left')!.getBoundingClientRect = rect(0, 40, 100, 40);
        document.querySelector('.ka-fixed-right')!.getBoundingClientRect = rect(250, 40, 50, 40);
        // the rects of the cells depend on the scrolling of the wrapper
        const cellAt = (element: HTMLElement, left: number, top: number, width: number, height: number) => {
            element.getBoundingClientRect = () => rect(left - wrapper.scrollLeft, top - wrapper.scrollTop, width, height)();
        };
        return { wrapper, cell, group, cellAt };
    };

    describe('getVisibleArea', () => {
        it('is the scrollport without the sticky header and the fixed columns of the row', () => {
            const { wrapper, cell, group } = layout();
            expect(getVisibleArea(wrapper, cell)).toEqual({ top: 40, left: 100, right: 250, bottom: 200 });
            // the group row has no fixed cells
            expect(getVisibleArea(wrapper, group)).toEqual({ top: 40, left: 0, right: 300, bottom: 200 });
        });
        it('is the scrollport when the header and the columns are not sticky', () => {
            const { wrapper, cell } = layout();
            document.querySelectorAll<HTMLElement>('[style]').forEach((element) => element.style.position = 'static');
            expect(getVisibleArea(wrapper, cell)).toEqual({ top: 0, left: 0, right: 300, bottom: 200 });
        });
    });

    describe('scrollCellIntoVisibleArea', () => {
        it('scrolls right to a cell under the fixed left column', () => {
            const { wrapper, cell, cellAt } = layout();
            wrapper.scrollLeft = 100;
            cellAt(cell, 150, 40, 80, 40);
            scrollCellIntoVisibleArea(wrapper, cell);
            expect(wrapper.scrollLeft).toBe(50);
            expect(wrapper.scrollTop).toBe(0);
        });
        it('scrolls left to a cell under the fixed right column', () => {
            const { wrapper, cell, cellAt } = layout();
            cellAt(cell, 220, 40, 80, 40);
            scrollCellIntoVisibleArea(wrapper, cell);
            expect(wrapper.scrollLeft).toBe(50);
        });
        it('scrolls up to a cell under the sticky header and down to a cell below the scrollport', () => {
            const { wrapper, cell, cellAt } = layout();
            wrapper.scrollTop = 100;
            cellAt(cell, 100, 120, 80, 40);
            scrollCellIntoVisibleArea(wrapper, cell);
            expect(wrapper.scrollTop).toBe(80);
            cellAt(cell, 100, 300, 80, 40);
            scrollCellIntoVisibleArea(wrapper, cell);
            expect(wrapper.scrollTop).toBe(140);
        });
        it('does not scroll to a visible cell', () => {
            const { wrapper, cell, cellAt } = layout();
            wrapper.scrollLeft = 30;
            wrapper.scrollTop = 20;
            cellAt(cell, 150, 80, 80, 40);
            scrollCellIntoVisibleArea(wrapper, cell);
            expect(wrapper.scrollLeft).toBe(30);
            expect(wrapper.scrollTop).toBe(20);
        });
        it('does not scroll horizontally to a cell wider than the area which overlaps it (a group row)', () => {
            const { wrapper, group, cellAt } = layout();
            wrapper.scrollLeft = 200;
            cellAt(group, 0, 80, 1000, 40);
            scrollCellIntoVisibleArea(wrapper, group);
            expect(wrapper.scrollLeft).toBe(200);
        });
        it('aligns a cell wider than the area to its start when they do not overlap', () => {
            const { wrapper, group, cellAt } = layout();
            cellAt(group, 500, 80, 1000, 40);
            scrollCellIntoVisibleArea(wrapper, group);
            expect(wrapper.scrollLeft).toBe(500);
        });
        it('does not scroll horizontally to a fixed cell', () => {
            const { wrapper, cellAt } = layout();
            const fixed = document.querySelector<HTMLTableCellElement>('.ka-fixed-left')!;
            wrapper.scrollLeft = 100;
            cellAt(fixed, 0, 40, 100, 40);
            scrollCellIntoVisibleArea(wrapper, fixed);
            expect(wrapper.scrollLeft).toBe(100);
        });
    });

    describe('focusCell', () => {
        it('focuses the cell without the scrolling of the browser and scrolls the wrapper', () => {
            const { wrapper, cell, cellAt } = layout();
            cell.tabIndex = 0;
            const focus = vi.spyOn(cell, 'focus');
            wrapper.scrollLeft = 100;
            cellAt(cell, 150, 40, 80, 40);
            focusCell(cell);
            expect(focus).toHaveBeenCalledWith({ preventScroll: true });
            expect(document.activeElement).toBe(cell);
            expect(wrapper.scrollLeft).toBe(50);
        });
        it('focuses a cell without a wrapper with the scrolling of the browser', () => {
            document.body.innerHTML = '<table><tbody><tr><td id="cell" tabindex="0">cell</td></tr></tbody></table>';
            const cell = document.querySelector<HTMLTableCellElement>('#cell')!;
            const focus = vi.spyOn(cell, 'focus');
            focusCell(cell);
            expect(focus).toHaveBeenCalledWith();
            expect(document.activeElement).toBe(cell);
        });
    });
});
