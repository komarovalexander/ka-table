import { INewRowProps } from '../../props';
import NewRow from './NewRow';
import React from 'react';
import ReactDOM from 'react-dom';

const props: INewRowProps = {
    childComponents: {},
    columns: [],
    groupColumnsCount: 0,
    dispatch: () => {},
    editableCells: [],
    rowKeyField: '',
} as any;

it('renders without crashing', () => {
    const div = document.createElement('tbody');
    ReactDOM.render(<NewRow {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
