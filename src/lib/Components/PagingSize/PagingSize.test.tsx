import { act, fireEvent, render } from '@testing-library/react';

import { ActionType } from '../../enums';
import { IPagingSizeProps } from '../../props';
import PagingSize from './PagingSize';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: IPagingSizeProps = {
    childComponents: {},
    value: 5,
} as IPagingSizeProps;

it('renders without crashing', () => {
    const element = document.createElement('div');
    const root = createRoot(element!);
    act(() => {
        root.render(<PagingSize  {...props} />);
    });
    act(() => {
        root.unmount();
    });
});
it('should render with custom content', () => {
    const { container } = render(
        <PagingSize
            {...props}
            childComponents={{
                pagingSize: { content: () => <>Custom Paging Size</> },
            }}
        />
    );
    expect(container.querySelector('.ka-paging-size')!.textContent).toEqual(
        'Custom Paging Size'
    );
});

it('onClick should dispath UpdatePageSize on click', () => {
    const dispatch = vi.fn();
    const { container } = render(<PagingSize {...props} dispatch={dispatch} />);
    fireEvent.click(container.querySelector('.ka-paging-size')!);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
        pageSize: 5,
        type: ActionType.UpdatePageSize,
    });
});
