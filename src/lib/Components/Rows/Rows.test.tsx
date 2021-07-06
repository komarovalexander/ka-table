import Enzyme, { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { EditingMode } from '../../enums';
import { getGroupMark } from '../../Utils/GroupUtils';
import { ITableBodyProps } from '../TableBody/TableBody';
import Rows, { IRowsProps } from './Rows';

Enzyme.configure({ adapter: new Adapter() });

const props: IRowsProps = {
  childComponents: {},
  columns: [
    { key: 'column', title: 'Column 1' },
    { key: 'column2', title: 'Column 2' },
  ],
  data: [
    { column: 1, column2: 2, id: 1 },
    { column: 12, column2: 22, id: 2 },
    { key: [1], groupMark: getGroupMark(), value: 1 },
  ],
  dispatch: () => {},
  format: ({value}) => `formatted: ${value}`,
  editableCells: [],
  editingMode: EditingMode.None,
  groupColumnsCount: 1,
  groupedColumns: [
    { key: 'column', title: 'Column 1' }],
  groups: [{ columnKey: 'column'}],
  onFirstRowRendered: () => {},
  rowKeyField: 'id',
  selectedRows: [],
};

describe('Rows', () => {
  it('renders without crashing', () => {
    const element = document.createElement('tbody');
    ReactDOM.render(<Rows {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

  it('formats group cell', () => {
    const wrapper = mount((
      <Rows {...props}/>
    ), {
      attachTo: document.createElement('tbody'),
    });
    expect(wrapper.find('.ka-group-text').text()).toBe('formatted: 1');
  });

  it('does not add ka-tree-cell class', () => {
    const wrapper = mount((
      <Rows {...props}/>
    ), {
      attachTo: document.createElement('tbody'),
    });
    expect(wrapper.find('.ka-tree-cell').length).toBe(0);
  });
});
