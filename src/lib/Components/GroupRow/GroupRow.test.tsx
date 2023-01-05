import Enzyme, { mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { DataType } from '../../enums';
import GroupRow from './GroupRow';
import { IGroupRowProps } from '../../props';
import React from 'react';
import ReactDOM from 'react-dom';

Enzyme.configure({ adapter: new Adapter() });

const props: IGroupRowProps = {
    childComponents: {},
    column: {
        key: '1',
        field: 'column',
        title: 'Column 1',
        dataType: DataType.String,
    },
    contentColSpan: 2,
    dispatch: jest.fn(),
    groupIndex: 0,
    groupKey: ['group'],
    isExpanded: true,
    text: '',
} as any;

describe('GroupRow', () => {
    it('renders without crashing', () => {
        const element = document.createElement('tbody');
        ReactDOM.render(<GroupRow {...props} />, element);
        ReactDOM.unmountComponentAtNode(element);
    });

    it('Should render custom group cell', () => {
        const groupRow = () => <td className="custom-group-row" />;
        const wrapper = mount(
            <GroupRow
                {...props}
                childComponents={{
                    groupRow: {
                        content: groupRow,
                    },
                }}
            />,
            {
                attachTo: document.createElement('tbody'),
            }
        );
        expect(wrapper.find('.custom-group-row').length).toBe(1);
    });
});
