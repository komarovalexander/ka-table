import { ActionType, DataType } from '../../enums';
import Enzyme, { mount } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import FilterRowNumber from './FilterRowNumber';
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
    rowData: { column: 1 },
};

describe('FilterRowNumber', () => {
    it('renders without crashing', () => {
        const element = document.createElement('td');
        const root = createRoot(element!);
        root.render(<FilterRowNumber {...props} />);
        root.unmount();
    });

    it('should fire FilterRowChanged', () => {
        const newValue = 2;
        const column = { field: 'name', key: 'nameKey', dataType: DataType.Number };
        const wrapper = mount(<FilterRowNumber {...props} column={column} />);

        wrapper.find('input').props().onChange!({currentTarget: { value: newValue} } as any);
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            columnKey: 'nameKey',
            filterRowValue: newValue,
            type: ActionType.UpdateFilterRowValue,
        });
    });
});
