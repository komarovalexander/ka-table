import { ActionType, SortDirection, SortingMode } from '../../enums';
import Enzyme, { mount } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import HeadCellContent from './HeadCellContent';
import { IHeadCellProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: IHeadCellProps = {
    areAllRowsSelected: false,
    childComponents: {},
    column: {
        key: 'fieldTest',
    },
    dispatch: jest.fn(),
    sortingMode: SortingMode.Single,
};

describe('HeadCellContent', () => {
    it('renders without crashing', () => {
        const element = document.createElement('th');
        const root = createRoot(element!);
        root.render(<HeadCellContent {...props} />);
        root.unmount();
    });

    it('onClick should dispath ChangeSorting', () => {
        const wrapper = mount(<HeadCellContent {...props} column={{ key: 'fieldTest', sortDirection: SortDirection.Ascend }} />);
        wrapper.find('.ka-thead-cell-content').simulate('click');
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            columnKey: 'fieldTest',
            type: ActionType.UpdateSortDirection,
        });
    });
});
