import Enzyme, { mount } from 'enzyme';

import { ActionType } from '../../enums';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import React from 'react';
import { TableWrapper } from './TableWrapper';
import { createRoot } from 'react-dom/client';

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

describe('TableWrapper', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
  root.render(<TableWrapper {...tableProps} />);
    root.unmount();
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

  it('does not have table foot by default', () => {
    const wrapper = mount(<TableWrapper {...tableProps} />);

    wrapper.contains('tfoot');
    expect(wrapper.find('tfoot').length).toBe(0);
  });

  describe('header', () => {
    it('hides table header in case of noData.hideHeader=true and data is empty', () => {
      const wrapper = mount((
        <TableWrapper {...tableProps} data={[]} noData={{hideHeader: true}}/>
      ));

      expect(wrapper.find('thead').length).toBe(0);
    });
    it('shows table header in case of noData.hideHeader=true and data has values', () => {
      const wrapper = mount((
        <TableWrapper {...tableProps} noData={{hideHeader: false}}/>
      ));

      expect(wrapper.find('thead').length).toBe(1);
    });
    it('shows table header in case of noData.hideHeader=false and data is empty', () => {
      const wrapper = mount((
        <TableWrapper {...tableProps} data={[]} noData={{hideHeader: false}}/>
      ));

      expect(wrapper.find('thead').length).toBe(1);
    });
  });

  it('shows table foot in case of tableFoot to be set', () => {
    const wrapper = mount((
      <TableWrapper {...tableProps} childComponents={{
        tableFoot: {
          elementAttributes: () => ({ className: 'custom-footer' }),
          content: () => <tr className='table-foot-custom-content'/>
        }
      }}/>
    ));

    wrapper.contains('tfoot');
    expect(wrapper.find('tfoot').length).toBe(1);
    expect(wrapper.find('tfoot.custom-footer').length).toBe(1);
    expect(wrapper.find('.table-foot-custom-content').length).toBe(1);
  });

  it('shows table foot in case of summaryRow to be set', () => {
    const wrapper = mount((
      <TableWrapper {...tableProps} childComponents={{
        summaryRow: {
          elementAttributes: () => ({ className: 'custom-summaryRow' }),
          content: () => <td className='summaryRow-content'/>
        }
      }}/>
    ));

    wrapper.contains('tfoot');
    expect(wrapper.find('tfoot').length).toBe(1);
    expect(wrapper.find('tr.custom-summaryRow').length).toBe(1);
    expect(wrapper.find('.summaryRow-content').length).toBe(1);
  });
  it('shows table foot in case of summaryCell to be set', () => {
    const wrapper = mount((
      <TableWrapper {...tableProps} childComponents={{
        summaryCell: {
          elementAttributes: () => ({ className: 'custom-summaryCell' }),
          content: () => <div className='summaryCell-content'/>
        }
      }}/>
    ));

    wrapper.contains('tfoot');
    expect(wrapper.find('tfoot').length).toBe(1);
    expect(wrapper.find('td.custom-summaryCell').length).toBe(2);
    expect(wrapper.find('.summaryCell-content').length).toBe(2);
  });
});
