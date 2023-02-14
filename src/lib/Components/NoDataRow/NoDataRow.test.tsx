import Enzyme, { mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { INoDataRowProps } from '../../props';
import NoDataRow from './NoDataRow';
import React from 'react';
import ReactDOM from 'react-dom';

Enzyme.configure({ adapter: new Adapter() });

const props: INoDataRowProps = {
    childComponents: {},
    columns: [],
    groupColumnsCount: 0,
} as any;

it('renders without crashing', () => {
    const div = document.createElement('tbody');
    ReactDOM.render(<NoDataRow {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('custom colspan for cell', () => {
    const wrapper = mount(<NoDataRow {...props} childComponents={{
        noDataCell: {
            elementAttributes: () => ({
                colSpan: 100
            })
        }
    }}/>, {
        attachTo: document.createElement('tbody')
    });
    expect(wrapper.find('.ka-no-data-cell').exists()).toBeTruthy();
    expect(wrapper.find('.ka-no-data-cell').prop('colSpan')).toBe(100);
});
