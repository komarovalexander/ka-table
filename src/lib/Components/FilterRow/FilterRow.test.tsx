import FilterRow from './FilterRow';
import { IFilterRowProps } from '../../props';
import React from 'react';
import ReactDOM from 'react-dom';

let props: IFilterRowProps;

beforeEach(() => {
    props = {
        columns: [],
        dispatch: jest.fn(),
        groupColumnsCount: 0,
    } as any;
});

it('renders without crashing', () => {
    const element = document.createElement('tbody');
    ReactDOM.render(<FilterRow {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
});
