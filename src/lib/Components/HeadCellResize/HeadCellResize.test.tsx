import Enzyme, { mount, shallow } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import HeadCellResize from './HeadCellResize';
import React from 'react';
import { createRoot } from 'react-dom/client';
import simulant from 'simulant';

Enzyme.configure({ adapter: new Adapter() });

const props = {
    column: {
        key: 'column1',
        width: 100
    },
    dispatch: jest.fn(),
    childComponents: {}
};

describe('HeadCellResize', () => {
    beforeEach(() => {
        props.dispatch.mockClear();
    });
    it('renders without crashing', () => {
        const element = document.createElement('div');
        const root = createRoot(element!);
        root.render(<HeadCellResize  {...props} />);
        root.unmount();
    });

    it('should handle onMouseDown correctly', () => {
        const wrapper = mount(<HeadCellResize {...props} />);
        const preventDefault = jest.fn();
        wrapper.simulate('mousedown', { preventDefault });
        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledTimes(0);
        simulant.fire(document.body, 'mousemove');
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        simulant.fire(document.body, 'mouseup');
        expect(props.dispatch).toHaveBeenCalledTimes(2);
    });

    it('should use parentWidth for resizing', () => {
        const wrapper = shallow(
            <HeadCellResize {...props} column={{
                key: 'column1',
                style: {
                    width: '20%'
                }
            }} />
        );
        wrapper.simulate('mousedown', { preventDefault: () => {}, screenX: 80, currentTarget: { parentElement : { offsetWidth: 80 } } });
        simulant.fire(document.body, 'mouseup', { screenX: 90 });
        expect(props.dispatch.mock.calls[0]).toEqual([{columnKey: 'column1', type: 'ResizeColumn', width: 90}]);
    });

    it('should use column.width for resizing', () => {
        const wrapper = shallow(<HeadCellResize {...props} />);
        wrapper.simulate('mousedown', { preventDefault: () => {}, screenX: 150 });
        simulant.fire(document.body, 'mouseup', { screenX: 160 });
        expect(props.dispatch.mock.calls[0]).toEqual([{columnKey: 'column1', type: 'ResizeColumn', width: 110}]);
    });
});
