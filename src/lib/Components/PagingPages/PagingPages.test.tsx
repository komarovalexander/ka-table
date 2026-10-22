import { ActionType } from '../../enums';
import { IPagingProps } from '../../props';
import PagingPages from './PagingPages';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act, fireEvent, render } from '@testing-library/react';

const props: IPagingProps = {
    pageSize: 2,
    pageIndex: 2,
    pagesCount: 3,
    enabled: true,
    dispatch: vi.fn(),
    childComponents: {}
};

describe('PagingPages', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders without crashing', () => {
        const element = document.createElement('div');
        const root = createRoot(element!);
        act(() => {
            root.render(<PagingPages  {...props} />);
        });
        act(() => {
            root.unmount();
        });
        expect(props.dispatch).toHaveBeenCalledTimes(0);
    });

    it('does not change the page index out of the pages: the table updates it', () => {
        render(<PagingPages {...props} pageIndex={3} />);
        expect(props.dispatch).toHaveBeenCalledTimes(0);
    });
    it('changes the page', () => {
        const { container } = render(<PagingPages {...props} />);
        fireEvent.click(container.querySelectorAll('.ka-paging-page-index')[0]);
        expect(props.dispatch).toHaveBeenCalledWith({
            pageIndex: 0,
            type: ActionType.UpdatePageIndex,
        });
    });
});
