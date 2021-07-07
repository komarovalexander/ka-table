import Enzyme, { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { DataType, EditingMode } from '../../enums';
import { IDataRowProps } from '../../props';
import DataRowContent from './DataRowContent';

Enzyme.configure({ adapter: new Adapter() });

const props: IDataRowProps = {
  childComponents: {},
  columns: [
    { key: 'column', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
  ],
  dispatch: () => {},
  editableCells: [],
  editingMode: EditingMode.None,
  isSelectedRow: false,
  rowEditableCells: [],
  rowData: [{ column: 1, column2: 2 }],
  rowKeyField: 'column',
  selectedRows: [],
};

describe('DataRowContent', () => {
  it('renders without crashing', () => {
    const element = document.createElement('tr');
    ReactDOM.render(<DataRowContent {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });
  it('click by first row dispatches action', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<DataRowContent {...props} dispatch={dispatch} isTreeGroup={true} />, {
      attachTo: document.createElement('tr'),
    });
    expect(dispatch).toHaveBeenCalledTimes(0);
    wrapper.find('.ka-icon-tree-arrow').simulate('click');
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
