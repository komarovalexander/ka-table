import { DataType } from '../../enums';
import FilterCell from './FilterCell';
import { IFilterRowEditorProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

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
    const root = createRoot(element!);
    root.render(<FilterCell {...props} />);
    root.unmount();
});
