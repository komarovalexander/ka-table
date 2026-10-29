import * as React from 'react';

import { FilteringMode } from '../../enums';
import { Table } from '../..';
import { fireEvent, render } from '@testing-library/react';

// two columns fixed to the left edge, a scrolled one, two columns fixed to the right edge
const columns = [
    { key: 'a', title: 'A', width: 100, fixed: 'left' as const },
    { key: 'b', title: 'B', width: 50, fixed: 'left' as const },
    { key: 'c', title: 'C', width: 200 },
    { key: 'd', title: 'D', width: 80, fixed: 'right' as const },
    { key: 'e', title: 'E', width: 60, fixed: 'right' as const },
];
const data = [{ id: 1, a: 'a1', b: 'b1', c: 'c1', d: 'd1', e: 'e1' }];
// the edges and the offsets of the cells
const getFixed = (cells: NodeListOf<HTMLElement>) => Array.from(cells).map((cell) => {
    const edge = cell.classList.contains('ka-fixed-left') ? 'left' : cell.classList.contains('ka-fixed-right') ? 'right' : '-';
    return `${edge} ${cell.style.left || cell.style.right}`.trim();
});

describe('column.fixed (#495)', () => {
    it('makes the cells of the column sticky after the other fixed columns of its edge', () => {
        const { container } = render(
            <Table
                columns={columns}
                data={data}
                rowKeyField='id'
                filteringMode={FilteringMode.FilterRow}
                childComponents={{ summaryCell: { content: ({ column }) => column.key } }}
            />
        );
        const fixed = ['left 0px', 'left 100px', '-', 'right 60px', 'right 0px'];
        expect(getFixed(container.querySelectorAll('thead th'))).toEqual(fixed);
        expect(getFixed(container.querySelectorAll('.ka-filter-row td'))).toEqual(fixed);
        expect(getFixed(container.querySelectorAll('tbody tr.ka-row td'))).toEqual(fixed);
        expect(getFixed(container.querySelectorAll('tfoot td'))).toEqual(fixed);
    });
    it('shows the shadows of the fixed columns while other columns are scrolled under them', () => {
        const { container } = render(<Table columns={columns} data={data} rowKeyField='id' />);
        const wrapper = container.querySelector('.ka-table-wrapper')!;
        // jsdom has no layout: 300px of 490px are visible
        Object.defineProperty(wrapper, 'clientWidth', { value: 300 });
        Object.defineProperty(wrapper, 'scrollWidth', { value: 490 });
        const getOverflow = () => ['left', 'right'].filter((edge) => container.querySelector('table')!.classList.contains(`ka-table-overflow-${edge}`));
        fireEvent.scroll(wrapper, { target: { scrollLeft: 0 } });
        expect(getOverflow()).toEqual(['right']);
        fireEvent.scroll(wrapper, { target: { scrollLeft: 100 } });
        expect(getOverflow()).toEqual(['left', 'right']);
        fireEvent.scroll(wrapper, { target: { scrollLeft: 190 } });
        expect(getOverflow()).toEqual(['left']);
        // the shadows are drawn by the fixed columns next to the scrolled ones
        expect(container.querySelector('tbody .ka-fixed-left-last')!.textContent).toBe('b1');
        expect(container.querySelector('tbody .ka-fixed-right-first')!.textContent).toBe('d1');
    });
    it('keeps the style of the column', () => {
        const { container } = render(<Table columns={[{ ...columns[0], style: { color: 'red' } }]} data={data} rowKeyField='id' />);
        const cell = container.querySelector<HTMLElement>('tbody td')!;
        expect(cell.style.color).toBe('red');
        expect(cell.style.left).toBe('0px');
    });
});
