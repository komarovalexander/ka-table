import { ActionType, DataType } from '../../enums';
import Enzyme, { mount } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import FilterRowString from './FilterRowString';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: any = {
    column: {
        dataType: DataType.String,
        key: 'columnField',
        title: 'Field',
    },
    dispatch: jest.fn(),
    isSelectedRow: true,
    rowData: { column: 1 },
    rowKeyField: '',
};

describe('FilterRowString', () => {
    it('renders without crashing', () => {
        const element = document.createElement('td');
        const root = createRoot(element!);
        root.render(<FilterRowString {...props} />);
        root.unmount();
    });

    it('FilterRowString: should pass field name to filterCellValueChangeHandler', () => {
        const newValue = '2';
        const column = { field: 'name', key: 'nameKey' };
        const wrapper = mount(<FilterRowString {...props} column={column} />);

        wrapper.find('input').props().onChange!({currentTarget: { value: newValue} } as any);
        expect(props.dispatch).toBeCalledTimes(1);
        expect(props.dispatch).toBeCalledWith(
            { type: ActionType.UpdateFilterRowValue, columnKey: 'nameKey', filterRowValue: newValue },
        );
    });
});
