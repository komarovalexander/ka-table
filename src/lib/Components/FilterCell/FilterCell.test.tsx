import { DataType } from '../../enums';
import FilterCell from './FilterCell';
import { IFilterRowEditorProps } from '../../props';
import React from 'react';
import ReactDOM from 'react-dom';

const props: IFilterRowEditorProps = {
    childComponents: {},
    column: {
        dataType: DataType.String,
        key: 'columnField',
        title: 'Field',
    },
} as any;

it('renders without crashing', () => {
    const element = document.createElement('tr');
    ReactDOM.render(<FilterCell {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
});
