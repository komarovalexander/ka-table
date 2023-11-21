import Enzyme, { mount } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import { INoDataRowProps } from '../../props';
import NoDataRow from './NoDataRow';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: INoDataRowProps = {
    childComponents: {},
    columns: [],
    groupColumnsCount: 0,
} as any;

it('renders without crashing', () => {
    const div = document.createElement('tbody');
    const root = createRoot(div!);
    root.render(<NoDataRow  {...props} />);
    root.unmount();
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
