import { ActionType, SortDirection, SortingMode } from '../../enums';
import { act, fireEvent, render } from '@testing-library/react';

import HeadCellContent from './HeadCellContent';
import { IHeadCellProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

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
        act(() => {
            root.render(<HeadCellContent {...props} />);
        });
        act(() => {
            root.unmount();
        });
    });

    it('onClick should dispath ChangeSorting', () => {
        const { container } = render(<HeadCellContent {...props} column={{ key: 'fieldTest', sortDirection: SortDirection.Ascend }} />);
        fireEvent.click(container.querySelector('.ka-thead-cell-content')!);
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            columnKey: 'fieldTest',
            type: ActionType.UpdateSortDirection,
        });
    });
});
