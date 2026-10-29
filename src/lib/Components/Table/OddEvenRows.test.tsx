import * as React from 'react';

import { IKaTableProps, Table } from '../..';
import { fireEvent, render } from '@testing-library/react';

type Row = { id: string, parentId: string | null };

const columns = [{ key: 'id', title: 'Id' }];
// a root with children and a grandchild, a root without children, a root with a child
const tree: Row[] = [
    { id: 'a', parentId: null },
    { id: 'a1', parentId: 'a' },
    { id: 'a11', parentId: 'a1' },
    { id: 'a2', parentId: 'a' },
    { id: 'b', parentId: null },
    { id: 'c', parentId: null },
    { id: 'c1', parentId: 'c' },
];
// the roots 0, 1, 2... with the children 0-1 and 0-2, 0-1 has the child 0-1-1
const createTree = (rootsCount: number): Row[] => Array.from({ length: rootsCount }, (_, root) => root).flatMap((root) => [
    { id: `${root}`, parentId: null },
    { id: `${root}-1`, parentId: `${root}` },
    { id: `${root}-1-1`, parentId: `${root}-1` },
    { id: `${root}-2`, parentId: `${root}` },
]);

const renderTree = (props: Partial<IKaTableProps<Row>> = {}) => render(
    <Table columns={columns} data={tree} rowKeyField='id' treeGroupKeyField='parentId' oddEvenRows='treeRoots' {...props} />
);
// the texts of the rows with their classes
const getStripes = (container: HTMLElement) => Array.from(container.querySelectorAll('tbody tr.ka-row')).map((row) => (
    `${row.textContent} ${row.classList.contains('ka-odd') ? 'odd' : row.classList.contains('ka-even') ? 'even' : '-'}`
));
// the rows which the virtual scrolling renders from the row 49 (12-1), and the classes of these rows without the virtual scrolling
const renderScrolledTree = (oddEvenRows: boolean | 'treeRoots') => {
    const data = createTree(50);
    const stripesOfTree = new Map(getStripes(renderTree({ data, oddEvenRows }).container).map((stripe) => [stripe.split(' ')[0], stripe]));
    const { container } = renderTree({ data, oddEvenRows, virtualScrolling: { enabled: true, itemHeight: 40, tbodyHeight: 200 } });
    fireEvent.scroll(container.querySelector('.ka-table-wrapper')!, { target: { scrollTop: 2000 } });
    const stripes = getStripes(container);
    return { stripes, stripesWithoutVirtualScrolling: stripes.map((stripe) => stripesOfTree.get(stripe.split(' ')[0])) };
};

describe('oddEvenRows', () => {
    it('alternates the rows', () => {
        const { container } = render(<Table columns={columns} data={[{ id: '1' }, { id: '2' }, { id: '3' }]} rowKeyField='id' oddEvenRows />);
        expect(getStripes(container)).toEqual(['1 odd', '2 even', '3 odd']);
    });
    it('alternates the rows of a tree', () => {
        const { container } = renderTree({ oddEvenRows: true });
        expect(getStripes(container)).toEqual(['a odd', 'a1 even', 'a11 odd', 'a2 even', 'b odd', 'c even', 'c1 odd']);
    });
    it('alternates the rows of a tree with the virtual scrolling', () => {
        const { stripes, stripesWithoutVirtualScrolling } = renderScrolledTree(true);
        expect(stripes[0]).toBe('12-1 even');
        expect(stripes).toEqual(stripesWithoutVirtualScrolling);
    });
});

describe('oddEvenRows treeRoots', () => {
    it('alternates the rows without a tree', () => {
        const { container } = render(<Table columns={columns} data={[{ id: '1' }, { id: '2' }, { id: '3' }]} rowKeyField='id' oddEvenRows='treeRoots' />);
        expect(getStripes(container)).toEqual(['1 odd', '2 even', '3 odd']);
    });
    it('gives a root of a tree and all its children the class of the root (#479)', () => {
        const { container } = renderTree();
        expect(getStripes(container)).toEqual(['a odd', 'a1 odd', 'a11 odd', 'a2 odd', 'b even', 'c odd', 'c1 odd']);
    });
    it('keeps the classes of the other roots when a root is collapsed', () => {
        const { container } = renderTree();
        fireEvent.click(container.querySelector('.ka-icon-tree-arrow')!);
        expect(getStripes(container)).toEqual(['a odd', 'b even', 'c odd', 'c1 odd']);
    });
    it('gives the rows the classes of the whole tree with the virtual scrolling', () => {
        const { stripes, stripesWithoutVirtualScrolling } = renderScrolledTree('treeRoots');
        // the first rendered row is a child, its root is not rendered
        expect(stripes[0]).toBe('12-1 odd');
        expect(stripes).toEqual(stripesWithoutVirtualScrolling);
    });
    it('counts the stripes from the first row of the page', () => {
        // the second page starts with the children of the root 1
        const { container } = renderTree({ data: createTree(3), paging: { enabled: true, pageIndex: 1, pageSize: 6 } });
        expect(getStripes(container)).toEqual(['1-1-1 odd', '1-2 odd', '2 even', '2-1 even', '2-1-1 even', '2-2 even']);
    });
});
