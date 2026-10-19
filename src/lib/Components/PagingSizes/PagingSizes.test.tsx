import { IPagingProps } from '../../props';
import PagingSizes from './PagingSizes';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act, render } from '@testing-library/react';

const props: IPagingProps = {
    pageSize: 2,
    pageIndex: 2,
    enabled: true,
    dispatch: jest.fn(),
    childComponents: {}
};

beforeEach(() => {
    jest.clearAllMocks();
});

it('renders without crashing', () => {
    const element = document.createElement('div');
    const root = createRoot(element!);
    act(() => {
        root.render(<PagingSizes  {...props} />);
    });
    act(() => {
        root.unmount();
    });
    expect(props.dispatch).toHaveBeenCalledTimes(0);
});
it('should be rendered without PagingSizes', () => {
    const { container } = render(<PagingSizes {...props} childComponents={{ pagingSizes: { content: () => (<>Custom Paging Sizes</>) }}} />);
    expect(container.querySelector('.ka-paging-sizes')!.textContent).toEqual('Custom Paging Sizes');
});
