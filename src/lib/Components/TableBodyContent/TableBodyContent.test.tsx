import Enzyme, { mount } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import { EditingMode } from '../../enums';
import { ITableBodyProps } from '../../props';
import React from 'react';
import TableBodyContent from './TableBodyContent';
import { createRoot } from 'react-dom/client';
import { newRowId } from '../../const';

Enzyme.configure({ adapter: new Adapter() });

const props: ITableBodyProps = {
    childComponents: {},
    columns: [
        { key: 'column', title: 'Column 1' },
        { key: 'column2', title: 'Column 2' },
    ],
    data: [
        { column: 1, column2: 2, id: 1 },
        { column: 12, column2: 22, id: 2 },
    ],
    dispatch: () => {},
    editableCells: [],
    editingMode: EditingMode.None,
    groupColumnsCount: 0,
    groupedColumns: [],
    rowKeyField: 'id',
    selectedRows: [],
} as any;

describe('TableBodyContent', () => {
    it('renders without crashing', () => {
        const element = document.createElement('tbody');
        const root = createRoot(element!);
        root.render(<TableBodyContent {...props} />);
        root.unmount();
    });

    it('should render noDataRow in case there are no data and noDataRow option is set', () => {
        const noDataText = 'no data';
        const wrapper = mount(
            <TableBodyContent
                {...props}
                data={[]}
                childComponents={{
                    noDataRow: {
                        content: () => noDataText,
                    },
                }}
            />,
            {
                attachTo: document.createElement('tbody'),
            }
        );

        expect(wrapper.find('.ka-tr').length).toBe(1);
        expect(wrapper.find('.ka-tr').text()).toBe(noDataText);
    });

    it('should render noDataRow with text in case there are no data and loading is disabled', () => {
        const noDataText = 'no data';
        const wrapper = mount(
            <TableBodyContent
                {...props}
                data={[]}
                loading={{
                    enabled: false
                }}
                noData={{
                    text: noDataText
                }}
            />,
            {
                attachTo: document.createElement('tbody'),
            }
        );

        expect(wrapper.find('.ka-tr').length).toBe(1);
        expect(wrapper.find('.ka-tr').text()).toBe(noDataText);
    });
    it('should render noDataRow without text in case there are no data and loading is enabled', () => {
        const noDataText = 'no data';
        const wrapper = mount(
            <TableBodyContent
                {...props}
                data={[]}
                loading={{
                    enabled: true
                }}
                noData={{
                    text: noDataText
                }}
            />,
            {
                attachTo: document.createElement('tbody'),
            }
        );

        expect(wrapper.find('.ka-tr').length).toBe(1);
        expect(wrapper.find('.ka-tr').text()).toBe('');
    });

    it('should render noDataRow & NewRow', () => {
        const wrapper = mount(
            <TableBodyContent
                {...props}
                editableCells={[{ rowKeyValue: newRowId, columnKey: 'column' }]}
                data={[]}
            />,
            {
                attachTo: document.createElement('tbody'),
            }
        );

        expect(wrapper.find('.ka-tr').length).toBe(2);
    });
});
