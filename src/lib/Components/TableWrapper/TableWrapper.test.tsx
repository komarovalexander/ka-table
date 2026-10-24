import { act, fireEvent, render } from '@testing-library/react';

import { ActionType } from '../../enums';
import { ITableAllProps } from '../Table/Table';
import React from 'react';
import { TableWrapper } from './TableWrapper';
import { createRoot } from 'react-dom/client';

const dispatch = vi.fn();
const tableProps: ITableAllProps = {
    columns: [
        { key: 'column' },
        { key: 'column2' },
    ],
    data: [
        { column: 1, column2: 2, id: 1 },
        { column: 12, column2: 22, id: 2 },
    ],
    dispatch,
    rowKeyField: 'id',
};

describe('TableWrapper', () => {
    beforeEach(() => {
        dispatch.mockClear();
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        const root = createRoot(div!);
        act(() => {
            root.render(<TableWrapper {...tableProps} />);
        });
        act(() => {
            root.unmount();
        });
    });

    it('should not dispatch ScrollTable on scroll', () => {
        const { container } = render(<TableWrapper {...tableProps} />);

        fireEvent.scroll(container.querySelector('.ka-table-wrapper')!, { target: { scrollTop: 11 } });
        expect(dispatch).toHaveBeenCalledTimes(0);
    });

    it('should dispatch ScrollTable on scroll in case of virtual scrolling', () => {
        const { container } = render(
            (
                <TableWrapper {...tableProps} virtualScrolling={({
                    itemHeight: 10,
                    tbodyHeight: 100
                })}/>
            )
        );
        const scrollTop = 11;

        fireEvent.scroll(container.querySelector('.ka-table-wrapper')!, { target: { scrollTop } });
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(
            { type: ActionType.ScrollTable, scrollTop },
        );
    });

    it('does not have table foot by default', () => {
        const { container } = render(<TableWrapper {...tableProps} />);

        expect(container.querySelectorAll('tfoot').length).toBe(0);
    });

    describe('areAllRowsSelected', () => {
        const getAreAllRowsSelected = (selectedRows: unknown[], data = tableProps.data) => {
            const { container } = render(
                <TableWrapper
                    {...tableProps}
                    data={data}
                    selectedRows={selectedRows}
                    childComponents={{
                        headCell: {
                            content: ({ areAllRowsSelected }) => <span className='all-selected'>{String(areAllRowsSelected)}</span>
                        }
                    }}
                />
            );
            const values = Array.from(container.querySelectorAll('.all-selected')).map((element) => element.textContent);
            expect(values).toHaveLength(tableProps.columns.length);
            expect(new Set(values).size).toBe(1);
            return JSON.parse(values[0]!);
        };

        it('is true if all rows are selected', () => {
            expect(getAreAllRowsSelected([2, 1])).toBe(true);
        });
        it('is false if some rows are not selected', () => {
            expect(getAreAllRowsSelected([1])).toBe(false);
        });
        it('is false if the same number of other rows is selected', () => {
            expect(getAreAllRowsSelected([1, 3])).toBe(false);
        });
        it('is true if selectedRows also contains keys which are not in data', () => {
            expect(getAreAllRowsSelected([1, 2, 3])).toBe(true);
        });
        it('is false without rows', () => {
            expect(getAreAllRowsSelected([], [])).toBe(false);
        });
    });

    describe('header', () => {
        it('hides table header in case of noData.hideHeader=true and data is empty', () => {
            const { container } = render((
                <TableWrapper {...tableProps} data={[]} noData={{hideHeader: true}}/>
            ));

            expect(container.querySelectorAll('thead').length).toBe(0);
        });
        it('shows table header in case of noData.hideHeader=true and data has values', () => {
            const { container } = render((
                <TableWrapper {...tableProps} noData={{hideHeader: false}}/>
            ));

            expect(container.querySelectorAll('thead').length).toBe(1);
        });
        it('shows table header in case of noData.hideHeader=false and data is empty', () => {
            const { container } = render((
                <TableWrapper {...tableProps} data={[]} noData={{hideHeader: false}}/>
            ));

            expect(container.querySelectorAll('thead').length).toBe(1);
        });
    });

    it('shows table foot in case of tableFoot to be set', () => {
        const { container } = render((
            <TableWrapper {...tableProps} childComponents={{
                tableFoot: {
                    elementAttributes: () => ({ className: 'custom-footer' }),
                    content: () => <tr className='table-foot-custom-content'/>
                }
            }}/>
        ));

        expect(container.querySelectorAll('tfoot').length).toBe(1);
        expect(container.querySelectorAll('tfoot.custom-footer').length).toBe(1);
        expect(container.querySelectorAll('.table-foot-custom-content').length).toBe(1);
    });

    it('shows table foot in case of summaryRow to be set', () => {
        const { container } = render((
            <TableWrapper {...tableProps} childComponents={{
                summaryRow: {
                    elementAttributes: () => ({ className: 'custom-summaryRow' }),
                    content: () => <td className='summaryRow-content'/>
                }
            }}/>
        ));

        expect(container.querySelectorAll('tfoot').length).toBe(1);
        expect(container.querySelectorAll('tr.custom-summaryRow').length).toBe(1);
        expect(container.querySelectorAll('.summaryRow-content').length).toBe(1);
    });
    it('shows table foot in case of summaryCell to be set', () => {
        const { container } = render((
            <TableWrapper {...tableProps} childComponents={{
                summaryCell: {
                    elementAttributes: () => ({ className: 'custom-summaryCell' }),
                    content: () => <div className='summaryCell-content'/>
                }
            }}/>
        ));

        expect(container.querySelectorAll('tfoot').length).toBe(1);
        expect(container.querySelectorAll('td.custom-summaryCell').length).toBe(2);
        expect(container.querySelectorAll('.summaryCell-content').length).toBe(2);
    });
});
