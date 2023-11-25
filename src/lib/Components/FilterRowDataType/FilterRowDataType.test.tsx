import { DataType } from '../../enums';
import FilterRowBoolean from '../FilterRowBoolean/FilterRowBoolean';
import { IFilterRowEditorProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: IFilterRowEditorProps = {
    column: {
        dataType: DataType.String,
        key: 'fieldName',
        title: 'Field',
    },
    dispatch: jest.fn(),
    field: 'fieldName',
} as any;

describe('FilterRowBoolean', () => {
    it('renders without crashing', () => {
        const element = document.createElement('td');
        const root = createRoot(element!);
        root.render(<FilterRowBoolean {...props} />);
        root.unmount();
    });
});
