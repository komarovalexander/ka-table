import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { loadData } from '../../actionCreators';
import { ActionType } from '../../enums';
import { Table } from './Table';

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
  ReactDOM.render(<Table {...tableProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should dispatch single action and clear it', () => {
  const dispatch = jest.fn();
  const props = {
    ...tableProps,
    singleAction: loadData(),
    dispatch
  };
  const div = document.createElement('div');
  ReactDOM.render(<Table {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
  expect(dispatch).toHaveBeenCalledTimes(2);
  expect(dispatch.mock.calls).toEqual([
    [{type: ActionType.LoadData}],
    [{type: ActionType.ClearSingleAction}]
  ]);
});

it('should not dispatch in case of single action is undefined', () => {
  const dispatch = jest.fn();
  const props = {
    ...tableProps,
    singleAction: undefined,
    dispatch
  };
  const div = document.createElement('div');
  ReactDOM.render(<Table {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
  expect(dispatch).toHaveBeenCalledTimes(0);
});
