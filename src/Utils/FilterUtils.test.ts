import { getRowEditableCells } from './FilterUtils';

describe('FilterUtils', () => {
  it('getRowEditableCells should returnu required cells from table EditableCells', () => {
    const rowEditableCells = getRowEditableCells(10, [{
      field: '10',
      rowKeyValue: 10,
    }, {
      field: '10',
      rowKeyValue: 2,
    }]);
    expect(rowEditableCells).toMatchSnapshot();
  });
});
