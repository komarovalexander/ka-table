import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { ActionType, EditingMode } from '../../enums';
import TableBody from './TableBody';

Enzyme.configure({ adapter: new Adapter() });

const props: any = {
  childAttributes: {},
  columns: [
    { key: 'column', title: 'Column 1' },
    { key: 'column2', title: 'Column 2' },
  ],
  data: [
    { column: 1, column2: 2, id: 1 },
    { column: 12, column2: 22, id: 2 },
  ],
  dispatch: jest.fn(),
  editableCells: [],
  editingMode: EditingMode.None,
  groupColumnsCount: 0,
  groupedColumns: [],
  rowKeyField: 'id',
  selectedRows: [],
};

afterEach(() => jest.clearAllMocks());

describe('TableBody', () => {
  it('renders without crashing', () => {
    const element = document.createElement('table');
    ReactDOM.render(<TableBody {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

  it('should dispatch ScrollTable on scroll', () => {
    const wrapper = mount(<TableBody {...props} />, {
      attachTo: document.createElement('table'),
    });
    const scrollTop = 11;
    const timeStamp = 12;

    wrapper.find('tbody').prop('onScroll')!({ currentTarget: {scrollTop}, timeStamp } as any);
    expect(props.dispatch).toBeCalledTimes(1);
    expect(props.dispatch).toBeCalledWith(
      ActionType.ScrollTable, { scrollTop, timeStamp },
    );
  });

});
