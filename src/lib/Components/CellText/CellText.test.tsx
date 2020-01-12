import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { ActionType, DataType, EditingMode } from '../../enums';
import { Cell } from '../../models';
import { ICellContentProps } from '../CellContent/CellContent';
import CellText from './CellText';

Enzyme.configure({ adapter: new Adapter() });

const props: ICellContentProps = {
  childAttributes: {},
  column: {
    dataType: DataType.String,
    key: 'columnField',
    title: 'Field',
  },
  dispatch: jest.fn(),
  editingMode: EditingMode.Cell,
  field: 'columnField',
  rowData: { columnField: 'columnFieldValue', id: 1 },
  rowKeyField: 'id',
};

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
    const cell: Cell = { columnKey: 'columnField', rowKey: 1 };
    expect(props.dispatch).toBeCalledWith(
      ActionType.OpenEditor, { cell },
    );
  });
});
