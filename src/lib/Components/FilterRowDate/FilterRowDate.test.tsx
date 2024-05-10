import { ActionType, DataType } from '../../enums';
import Enzyme, { mount } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import FilterRowDate from './FilterRowDate';
import { IFilterRowEditorProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });
const props: IFilterRowEditorProps = {
    column: {
        dataType: DataType.Date,
        key: 'fieldName',
        title: 'Field',
    },
    dispatch: jest.fn(),
} as any;

describe('FliterRowDate', () => {
    it('renders without crashing', () => {
        const element = document.createElement('td');
        const root = createRoot(element!);
        root.render(<FilterRowDate {...props} />);
        root.unmount();
    });

    it('should fire UpdateFilterRowValue', () => {
        const newValue = new Date(2020, 1, 2);
        const column = {
            field: 'name',
            key: 'nameKey',
            dataType: DataType.Date,
        };
        const wrapper = mount(<FilterRowDate {...props} column={column} />);

        wrapper.find('input').props().onChange!({
            currentTarget: { value: newValue },
        } as any);
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            type: ActionType.UpdateFilterRowValue,
            filterRowValue: newValue,
            columnKey: 'nameKey',
        });
    });
});
