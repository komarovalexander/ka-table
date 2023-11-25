import Enzyme, { mount } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import { DataType } from '../../enums';
import HeaderRow from './HeadRow';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: any = {
    childComponents: {},
    columns: [
        { key: 'column', title: 'Column 1', dataType: DataType.String },
        { key: 'column2', title: 'Column 2', dataType: DataType.String },
    ],
};

it('renders without crashing', () => {
    const element = document.createElement('thead');
    const root = createRoot(element!);
    root.render(<HeaderRow  {...props} />);
    root.unmount();
});

it('should handle onMouseDown correctly', () => {
    const wrapper = mount((
        <HeaderRow {...props} childComponents={{
            headRow: {
                content: () => <td>Custom</td>
            }
        }} />
    ), {
        attachTo: document.createElement('thead')
    });
    expect(wrapper.find('td').text()).toBe('Custom');
});

