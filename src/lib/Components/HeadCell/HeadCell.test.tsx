import { Column } from '../../Models/Column';
import HeaderCell from './HeadCell';
import { IHeadCellProps } from '../../props';
import React from 'react';
import ReactDOM from 'react-dom';

const props: IHeadCellProps = {
    column: new Column(),
    childComponents: {},
} as any;

it('renders without crashing', () => {
    const element = document.createElement('tr');
    ReactDOM.render(<HeaderCell {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
});
