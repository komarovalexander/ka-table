import { act, fireEvent, render } from '@testing-library/react';

import { ActionType } from '../../enums';
import { IPagingIndexProps } from '../../props';
import PagingIndex from './PagingIndex';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: IPagingIndexProps = {
    childComponents: {},
} as any;

it('renders without crashing', () => {
    const element = document.createElement('div');
    const root = createRoot(element!);
    act(() => {
        root.render(<PagingIndex  {...props} />);
    });
    act(() => {
        root.unmount();
    });
});

it('onClick should dispath UpdatePageIndex on click', () => {
    const dispatch = jest.fn();
    const { container } = render(
        <PagingIndex {...props} pageIndex={2} dispatch={dispatch} />
    );
    fireEvent.click(container.querySelector('.ka-paging-page-index')!);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
        pageIndex: 2,
        type: ActionType.UpdatePageIndex,
    });
});
