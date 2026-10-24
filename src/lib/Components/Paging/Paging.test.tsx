import { IPagingProps } from '../../props';
import Paging from './Paging';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act, render } from '@testing-library/react';

const props: IPagingProps = {
    childComponents: {},
    enabled: true,
    pageIndex: 1,
    pageSize: 2,
    pagesCount: 2,
} as IPagingProps;

it('renders without crashing', () => {
    const element = document.createElement('div');
    const root = createRoot(element!);
    act(() => {
        root.render(<Paging  {...props} />);
    });
    act(() => {
        root.unmount();
    });
});
it('should be rendered with PagingSizes', () => {
    const { container } = render(<Paging {...props} pageSizes={[5, 10, 15]} />);
    expect(container.querySelector('.ka-paging-sizes')).not.toBeNull();
});
it('should be rendered without PagingSizes', () => {
    const { container } = render(<Paging {...props} pageSizes={undefined} />);
    expect(container.querySelector('.ka-paging-sizes')).toBeNull();
});
it('should render with custom content', () => {
    const { container } = render(
        <Paging
            {...props}
            childComponents={{ paging: { content: () => <>Custom Paging</> } }}
        />
    );
    expect(container.querySelector('.ka-paging')!.textContent).toEqual('Custom Paging');
});
