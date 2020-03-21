import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { ActionType, SortDirection, SortingMode } from '../../enums';
import { Column } from '../../Models/Column';
import { IHeadCellProps } from '../HeadCell/HeadCell';
import HeadCellContent from './HeadCellContent';

Enzyme.configure({ adapter: new Adapter() });

const props: IHeadCellProps = {
  column: {
    key: 'fieldTest',
  },
  dispatch: jest.fn(),
  sortingMode: SortingMode.Single,
};

describe('HeadCellContent', () => {
  it('renders without crashing', () => {
    const element = document.createElement('th');
    ReactDOM.render(<HeadCellContent {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

  it('onClick should dispath ChangeSorting', () => {
    const wrapper = mount(<HeadCellContent {...props} column={{key: 'fieldTest', sortDirection: SortDirection.Ascend}}/>);
    wrapper.find('.ka-thead-cell-content').simulate('click');
    expect(props.dispatch).toBeCalledTimes(1);
    expect(props.dispatch).toBeCalledWith({
      columnKey: 'fieldTest',
      type: ActionType.UpdateSortingDirection,
    });
  });
});
