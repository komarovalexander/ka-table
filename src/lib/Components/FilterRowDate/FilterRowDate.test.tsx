import { ActionType, DataType } from '../../enums';
import Enzyme, { mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import FilterRowDate from './FilterRowDate';
import { IFilterRowEditorProps } from '../../props';
import React from 'react';
import ReactDOM from 'react-dom';

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
        ReactDOM.render(<FilterRowDate {...props} />, element);
        ReactDOM.unmountComponentAtNode(element);
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
        expect(props.dispatch).toBeCalledTimes(1);
        expect(props.dispatch).toBeCalledWith({
            type: ActionType.UpdateFilterRowValue,
            filterRowValue: newValue,
            columnKey: 'nameKey',
        });
    });
});
