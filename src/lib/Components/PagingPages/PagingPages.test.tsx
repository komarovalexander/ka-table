import Enzyme, { mount } from 'enzyme';

import { ActionType } from '../../enums';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { IPagingProps } from '../../props';
import PagingPages from './PagingPages';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: IPagingProps = {
    pageSize: 2,
    pageIndex: 2,
    pagesCount: 3,
    enabled: true,
    dispatch: jest.fn(),
    childComponents: {}
};

describe('PagingPages', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        const element = document.createElement('div');
        const root = createRoot(element!);
        root.render(<PagingPages  {...props} />);
        root.unmount();
        expect(props.dispatch).toHaveBeenCalledTimes(0);
    });

    it('set page index as 0 in case it out of the pages lenght', () => {
        mount(<PagingPages {...props} pageIndex={3} />);
        expect(props.dispatch).toHaveBeenCalledWith({
            pageIndex: 0,
            type: ActionType.UpdatePageIndex,
        });
    });
    it('dont set page index as 0 in case it inside of the pages lenght', () => {
        mount(<PagingPages {...props} pageIndex={2} />);
        expect(props.dispatch).toHaveBeenCalledTimes(0);
    });
    it('dont set page index as 0 in case it equals 0 and pages is empty', () => {
        mount(<PagingPages {...props} pageIndex={0} />);
        expect(props.dispatch).toHaveBeenCalledTimes(0);
    });
});
