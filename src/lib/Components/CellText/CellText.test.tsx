import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { ActionType, DataType, EditingMode } from '../../enums';
import { ICellContentProps } from '../CellContent/CellContent';
import CellText from './CellText';

Enzyme.configure({ adapter: new Adapter() });

const props: ICellContentProps = {
  childComponents: {},
  column: {
    dataType: DataType.String,
    key: 'columnField',
    title: 'Field',
  },
  dispatch: jest.fn(),
  editingMode: EditingMode.Cell,
  field: 'columnField',
  isSelectedRow: false,
  rowData: { columnField: 'columnFieldValue', id: 1 },
  rowKeyField: 'id',
  rowKeyValue: 1,
  value: 'columnFieldValue',
};

afterEach(() => jest.clearAllMocks());

describe('CellText', () => {
  it('renders without crashing', () => {
    const element = document.createElement('td');
    ReactDOM.render(<CellText {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

  it('should dispatch OpenEditor', () => {
    const wrapper = mount(<CellText {...props} />);

    wrapper.find('.ka-cell-text').simulate('click');
    expect(props.dispatch).toBeCalledTimes(1);
    expect(props.dispatch).toBeCalledWith(
      { type: ActionType.OpenEditor, columnKey: 'columnField', rowKeyValue: 1 },
    );
  });

  it('should skip OpenEditor', () => {
    const wrapper = mount(<CellText {...props} editingMode={EditingMode.None} />);
    wrapper.find('.ka-cell-text').simulate('click');
    expect(props.dispatch).toBeCalledTimes(0);
  });
});
