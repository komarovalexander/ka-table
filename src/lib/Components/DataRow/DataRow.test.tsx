import Enzyme, { mount, shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { DataType, EditingMode } from '../../enums';
import { IRowProps } from '../../props';
import DataRow from './DataRow';

Enzyme.configure({ adapter: new Adapter() });

const props: IRowProps = {
  childComponents: {},
  columns: [
    { key: 'column', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
  ],
  dispatch: () => {},
  editableCells: [],
  editingMode: EditingMode.None,
  groupColumnsCount: 0,
  isSelectedRow: false,
  rowData: [{ column: 1, column2: 2 }],
  rowEditableCells: [],
  rowKeyField: 'column',
  rowKeyValue: 1,
  selectedRows: [],
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('DataRow', () => {
  it('renders without crashing', () => {
    const element = document.createElement('tbody');
    ReactDOM.render(<DataRow {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

  it('renders with draggable', () => {
    const component = shallow(<DataRow {...props} rowReordering={true}/>);
    expect(component.props().draggable).toBeTruthy();
  });

  it('renders without draggable', () => {
    const component = shallow(<DataRow {...props}/>);
    expect(component.props().draggable).toBeFalsy();
  });

  it('overrides default ref', () => {
    const ref = jest.fn();
    mount(<DataRow {...props} childComponents={{ dataRow: { elementAttributes: () => ({ ref })}}}/>, {
      attachTo: document.createElement('tbody'),
    });
    expect(ref).toBeCalled();
  });
});

