import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { ActionType } from '../../enums';
import { TableWrapper } from './TableWrapper';

Enzyme.configure({ adapter: new Adapter() });

const tableProps: any = {
  columns: [
    { key: 'column', name: 'Column 1' },
    { key: 'column2', name: 'Column 2' },
  ],
  data: [
    { column: 1, column2: 2, id: 1 },
    { column: 12, column2: 22, id: 2 },
  ],
  dispatch: jest.fn(),
  rowKeyField: 'id',
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TableWrapper {...tableProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should not dispatch ScrollTable on scroll', () => {
  const wrapper = mount(<TableWrapper {...tableProps} />);
  expect(wrapper.find('.ka-table-wrapper').prop('onScroll')).toBeUndefined();
  expect(tableProps.dispatch).toBeCalledTimes(0);
});

it('should dispatch ScrollTable on scroll in case of virtual scrolling', () => {
  const wrapper = mount(
    (
      <TableWrapper {...tableProps} virtualScrolling={({
        itemHeight: 10,
        tbodyHeight: 100
      })}/>
    )
  );
  const scrollTop = 11;

  wrapper.find('.ka-table-wrapper').prop('onScroll')!({ currentTarget: {scrollTop} } as any);
  expect(tableProps.dispatch).toBeCalledTimes(1);
  expect(tableProps.dispatch).toBeCalledWith(
    { type: ActionType.ScrollTable, scrollTop },
  );
});
