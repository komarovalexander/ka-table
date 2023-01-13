import { INoDataRowProps } from '../../props';
import NoDataRow from './NoDataRow';
import React from 'react';
import ReactDOM from 'react-dom';

const props: INoDataRowProps = {
    childComponents: {},
    columns: [],
    groupColumnsCount: 0,
} as any;

it('renders without crashing', () => {
    const div = document.createElement('tbody');
    ReactDOM.render(<NoDataRow {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
