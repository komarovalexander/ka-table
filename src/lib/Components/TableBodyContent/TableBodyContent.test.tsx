import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { EditingMode } from '../../enums';
import { ITableBodyProps } from '../TableBody/TableBody';
import TableBodyContent from './TableBodyContent';

Enzyme.configure({ adapter: new Adapter() });

const props: ITableBodyProps = {
  childComponents: {},
  columns: [
    { key: 'column', title: 'Column 1' },
    { key: 'column2', title: 'Column 2' },
  ],
  data: [
    { column: 1, column2: 2, id: 1 },
    { column: 12, column2: 22, id: 2 },
  ],
  dispatch: () => {},
  editableCells: [],
  editingMode: EditingMode.None,
  groupColumnsCount: 0,
  groupedColumns: [],
  rowKeyField: 'id',
  selectedRows: [],
};

describe('TableBodyContent', () => {
  it('renders without crashing', () => {
    const element = document.createElement('tbody');
    ReactDOM.render(<TableBodyContent {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

  it('should render noDataRow in case there are no data and noDataRow option is set', () => {
    const noDataText = 'no data';
    const wrapper = mount(<TableBodyContent {...props} data={[]} noDataRow={() => noDataText}/>, {
      attachTo: document.createElement('tbody'),
    });

    expect(wrapper.find('.ka-tr').text()).toBe(noDataText);
  });
});
