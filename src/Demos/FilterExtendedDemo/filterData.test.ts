import { filterGroupAnd, filterGroupOr } from './filterData';

describe('filter data', () => {
  it('filterGroupAnd', () => {
    const data = [
      { id: 1, field: 1, field2: 'text '},
      { id: 2, field: 1, field2: 'text 2'},
      { id: 3, field: 2, field2: 'text 3'},
      { id: 4, field: 1, field2: 'text 2'},
    ];
    const items = [{
      field: 'field',
      operator: '=',
      value: 1,
    }, {
      field: 'field2',
      operator: '=',
      value: 'text 2',
    }];
    const result = filterGroupAnd(data, items);
    expect(result).toMatchSnapshot();
  });
  it('filterGroupAnd with inner groups', () => {
    const data = [
      { id: 1, field: 1, field2: 'text '},
      { id: 2, field: 1, field2: 'text 2'},
      { id: 3, field: 2, field2: 'text 3'},
      { id: 4, field: 1, field2: 'text 2'},
    ];
    const items = [{
      field: 'field',
      operator: '=',
      value: 1,
    }, {
      groupName: 'and',
      items: [{
        field: 'field2',
        operator: '=',
        value: 'text 2',
      }],
    }];
    const result = filterGroupAnd(data, items);
    expect(result).toMatchSnapshot();
  });
  it('filterGroupAnd with inner groups case 2', () => {
    const data = [
      { id: 1, field: 1, field2: 'text '},
      { id: 2, field: 1, field2: 'text 2'},
      { id: 3, field: 2, field2: 'text 3'},
      { id: 4, field: 1, field2: 'text 2'},
    ];
    const items = [{
      field: 'field',
      operator: '=',
      value: 1,
    }, {
      groupName: 'and',
      items: [{
        field: 'field2',
        operator: '=',
        value: 'text 2',
      }, {
        field: 'id',
        operator: '=',
        value: 4,
      }],
    }];
    const result = filterGroupAnd(data, items);
    expect(result).toMatchSnapshot();
  });
  it('filterGroupOr', () => {
    const data = [
      { id: 1, field: 1, field2: 'text '},
      { id: 2, field: 3, field2: 'text 2'},
      { id: 3, field: 2, field2: 'text 3'},
      { id: 4, field: 1, field2: 'text 2'},
    ];
    const items = [{
      field: 'field',
      operator: '=',
      value: 1,
    }, {
      field: 'field2',
      operator: '=',
      value: 'text 2',
    }];
    const result = filterGroupOr(data, items);
    expect(result).toMatchSnapshot();
  });
  it('filterGroupOr with inner groups', () => {
    const data = [
      { id: 1, field: 1, field2: 'text '},
      { id: 2, field: 3, field2: 'text 2'},
      { id: 3, field: 2, field2: 'text 3'},
      { id: 4, field: 4, field2: 'text 2'},
      { id: 5, field: 5, field2: 'text 4'},
    ];
    const items = [{
      field: 'field',
      operator: '=',
      value: 1,
    }, {
      groupName: 'or',
      items: [{
        field: 'field2',
        operator: '=',
        value: 'text 3',
      }, {
        field: 'id',
        operator: '=',
        value: 4,
      }],
    }];
    const result = filterGroupOr(data, items);
    expect(result).toMatchSnapshot();
  });
});
