import { DataType, EditingMode } from '../../enums';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CellComponent from './CellComponent';
import Enzyme from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

Enzyme.configure({ adapter: new Adapter() });

const props: any = {
    childComponents: {},
    column: {
        dataType: DataType.String,
        key: 'columnField',
        title: 'Field',
    },
    dispatch: () => {},
    editingMode: EditingMode.None,
    isEditableCell: false,
    isSelectedRow: false,
    rowData: {
        column: 1,
    },
    rowKeyField: '1',
};

it('renders without crashing', () => {
    const element = document.createElement('tr');
    ReactDOM.render(<CellComponent {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
});
