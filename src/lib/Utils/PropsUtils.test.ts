
import { AllHTMLAttributes } from 'react';

import { ITableProps } from '../';
import { DataType, EditingMode, FilterOperatorName, SortDirection, SortingMode } from '../enums';
import { Column } from '../models';
import { ICellProps } from '../props';
import { ChildAttributesItem } from '../types';
import {
  areAllFilteredRowsSelected, areAllVisibleRowsSelected, getData, getDraggableProps,
  getPagesCountByProps, getSelectedData, mergeProps, prepareTableOptions,
} from './PropsUtils';

describe('PropsUtils', () => {
  it('mergeProps', () => {
    const childElementAttributes: AllHTMLAttributes<HTMLElement> = {
      className: 'custom',
      onClick: () => {},
      onDoubleClick: () => {},
    };

    const dispatch = () => {};
    const childProps: ICellProps = {
      childComponents: {},
      column: { key: 'column' },
      dispatch,
      editingMode: EditingMode.Cell,
      field: 'column',
      rowData: { column: 1, column2: 2, id: 0 },
      rowKeyField: 'id',
    };

    const childCustomAttributes: ChildAttributesItem<any> = {
      onClick: jest.fn(),
    };
    const props = mergeProps(childElementAttributes, childProps, childCustomAttributes, dispatch);
    const e: any = {name: 'eventName'};
    props.onClick!(e);
    expect(childCustomAttributes.onClick).toHaveBeenCalledTimes(1);
    expect(childCustomAttributes.onClick).toHaveBeenCalledWith(e, {
      baseFunc: childElementAttributes.onClick,
      childElementAttributes,
      childProps,
      dispatch: childProps.dispatch,
    });
  });
});

describe('getData', () => {
  const dataArray = Array(5).fill(undefined).map(
    (_, index) => ({
      column1: `column:1 row:${index}`,
      column2: `column:2 row:${index}`,
      column3: `column:3 row:${index}`,
      column4: `column:4 row:${index}`,
      id: index,
    }),
  );
  const props: ITableProps = {
    data: dataArray,
    columns: [
      { key: 'column1', title: 'Column 1', dataType: DataType.String },
      { key: 'column2', title: 'Column 2', dataType: DataType.String },
      { key: 'column3', title: 'Column 3', dataType: DataType.String },
      { key: 'column4', title: 'Column 4', dataType: DataType.String },
    ],
    rowKeyField: 'id'
  }
  it('get data by search', () => {
    const result = getData({ ...props , searchText: 'row:3' });
    expect(result).toMatchSnapshot();
  });
  it('get data by filter', () => {
    const result = getData({ ...props , columns: [
      {
        key: 'column1',
        title: 'Column 1',
        dataType: DataType.String,
        filterRowValue: 'column:1 row:2'
      }
    ] });
    expect(result).toMatchSnapshot();
  });
  it('get data by filter (number)', () => {
    const result = getData({
      ...props,
      columns: [
        {
          key: 'column1',
          dataType: DataType.Number,
          title: 'Column 1',
          filterRowValue: 1
        }
      ],
      data: [{column1: 1}, {column1: 11}]
    });
    expect(result).toMatchSnapshot();
  });

  it('get data by extendedFilter', () => {
    const result = getData({ ...props , extendedFilter: (data) => data.filter(i => i.id === 1) });
    expect(result).toMatchSnapshot();
  });

  it('get sorted data', () => {
    const result = getData({ ...props , columns: [{
      key: 'column1',
      title: 'Column 1',
      dataType: DataType.String,
      sortDirection: SortDirection.Descend
    }]});
    expect(result).toMatchSnapshot();
  });

  it('skips sorting in case of singleRemote', () => {
    const result = getData({ ...props, sortingMode: SortingMode.SingleRemote, columns: [{
      key: 'column1',
      title: 'Column 1',
      dataType: DataType.String,
      sortDirection: SortDirection.Descend
    }]});
    expect(result).toMatchSnapshot();
  });

  it('get paged data', () => {
    const result = getData({ ...props , paging: { enabled: true, pageIndex: 1, pageSize: 2 }});
    expect(result).toMatchSnapshot();
  });

  it('get grouped data', () => {
    const result = getData({ ...props , groups: [{ columnKey: 'column1' }] });
    expect(result).toMatchSnapshot();
  });
});

describe('getDraggableProps', () => {
  const key = 1;
  const actionType = 'test_action';
  const dispatch = jest.fn();
  const actionCreator = jest.fn().mockReturnValue({ type: actionType });
  const draggedClass = 'draggedClassTest';
  const dragOverClass = 'dragOverClassTest';
  let event: any;
  beforeEach(() => {
    dispatch.mockClear();
    actionCreator.mockClear();
    event = {
      dataTransfer: {
        setData: jest.fn(),
        getData: jest.fn().mockReturnValue(2),
        effectAllowed: ''
      },
      currentTarget: {
        classList: {
          add: jest.fn(),
          contains: jest.fn(),
          remove: jest.fn(),
        }
      },
      preventDefault: jest.fn()
    };
  });
  it('should be draggable', () => {
    const result = getDraggableProps(key, dispatch, actionCreator, draggedClass, dragOverClass);
    expect(result.draggable).toBeTruthy();
  });
  it('onDragStart', () => {
    const result = getDraggableProps(key, dispatch, actionCreator, draggedClass, dragOverClass);
    result.onDragStart!(event, {} as any);
    expect(event.dataTransfer.setData).toBeCalledWith('ka-draggableKeyValue', '1');
    expect(event.currentTarget.classList.add).toBeCalledWith(draggedClass);
    expect(event.dataTransfer.effectAllowed).toEqual('move');
  });
  it('onDragEnd', () => {
    const result = getDraggableProps(key, dispatch, actionCreator, draggedClass, dragOverClass);
    result.onDragEnd!(event, {} as any);
    expect(event.currentTarget.classList.remove).toBeCalledWith(draggedClass);
  });
  it('onDrop', () => {
    const result = getDraggableProps(key, dispatch, actionCreator, draggedClass, dragOverClass);
    result.onDrop!(event, {} as any);
    expect(event.currentTarget.classList.remove).toBeCalledWith(dragOverClass);
    expect(dispatch).toBeCalledWith({ type: actionType });
    expect(actionCreator).toBeCalledWith(2, 1);
  });
  it('onDragEnter', () => {
    const result = getDraggableProps(key, dispatch, actionCreator, draggedClass, dragOverClass);
    event.currentTarget.classList.contains.mockReturnValue(true);
    result.onDragEnter!(event, {} as any);
    expect(event.currentTarget.classList.add).toBeCalledTimes(0);
    event.currentTarget.classList.contains.mockReturnValue(false);
    result.onDragEnter!(event, {} as any);
    expect(event.currentTarget.classList.add).toBeCalledTimes(1);
    expect(event.currentTarget.classList.add).toBeCalledWith(dragOverClass);
    expect(event.preventDefault).toBeCalledTimes(2);
  });
  it('onDragLeave', () => {
    const result = getDraggableProps(key, dispatch, actionCreator, draggedClass, dragOverClass);
    result.onDragEnter!(event, {} as any);
    result.onDragEnter!(event, {} as any);
    result.onDragLeave!(event, {} as any);
    expect(event.currentTarget.classList.remove).toBeCalledTimes(0);
    result.onDragLeave!(event, {} as any);
    expect(event.currentTarget.classList.remove).toBeCalledWith(dragOverClass);
  });
  it('onDragOver', () => {
    const result = getDraggableProps(key, dispatch, actionCreator, draggedClass, dragOverClass);
    event.currentTarget.classList.contains.mockReturnValue(true);
    result.onDragOver!(event, {} as any);
    expect(event.currentTarget.classList.add).toBeCalledTimes(0);
    event.currentTarget.classList.contains.mockReturnValue(false);
    result.onDragOver!(event, {} as any);
    expect(event.currentTarget.classList.add).toBeCalledTimes(1);
    expect(event.currentTarget.classList.add).toBeCalledWith(dragOverClass);
    expect(event.preventDefault).toBeCalledTimes(2);
  });
});

describe('prepareTableOptions', () => {
  it('prepareTableOptions', () => {
    const columns: Column[] = [
      { key: 'column1', visible: false },
      { key: 'column2', visible: true },
      { key: 'column3' },
      { key: 'column4', visible: false }
    ]
    const result = prepareTableOptions({ columns, rowKeyField: 'column1' });
    expect(result.columns).toMatchSnapshot();
  });
  it('should filter number correctly', () => {
    const columns: Column[] = [
      { key: 'column1', filterRowValue: 1, dataType: DataType.Number },
    ];
    const data = [{ column1: 1 }, { column1: 11 }]
    const result = prepareTableOptions({ columns, rowKeyField: 'column1', data });
    expect(result.groupedData).toMatchSnapshot();
  });
});

describe('areAllFilteredRowsSelected', () => {
  it('true', () => {
    const tableProps: ITableProps = {
      columns: [{ key: 'test', filterRowValue: 4, filterRowOperator: FilterOperatorName.LessThanOrEqual }],
      data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      selectedRows: [1, 2, 3, 4],
      rowKeyField: 'test',
      paging: {
        enabled: true,
        pageSize: 2
      }
    };
    const allFilteredRowsSelected = areAllFilteredRowsSelected(tableProps);
    expect(allFilteredRowsSelected).toBeTruthy();
  });
  it('false', () => {
    const tableProps: ITableProps = {
      columns: [{ key: 'id', filterRowValue: 4, filterRowOperator: FilterOperatorName.LessThanOrEqual }],
      data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      selectedRows: [1, 3, 5],
      rowKeyField: 'id',
      paging: {
        enabled: true,
        pageSize: 2
      }
    };
    const allFilteredRowsSelected = areAllFilteredRowsSelected(tableProps);
    expect(allFilteredRowsSelected).toBeFalsy();
  });
  it('false if selectedRows is undefined', () => {
    const tableProps: ITableProps = {
      columns: [{ key: 'id', filterRowValue: 4, filterRowOperator: FilterOperatorName.LessThanOrEqual }],
      data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      rowKeyField: 'id',
      paging: {
        enabled: true,
        pageSize: 2
      }
    };
    const allFilteredRowsSelected = areAllFilteredRowsSelected(tableProps);
    expect(allFilteredRowsSelected).toBeFalsy();
  });
});

describe('getDraggableProps', () => {
  const tableProps = {
    columns: [{ key: 'column' }],
    rowKeyField: 'id',
    data: Array(30).fill(undefined).map(
      (_, index) => ({
        id: index,
        column: index % 5
      }),
    ),
    paging: {
      enabled: true,
      pageSize: 3
    },
    searchText: '3'
  };
  it('pages count should depends on filters', () => {
    const pagesCount = getPagesCountByProps(tableProps);
    expect(pagesCount).toEqual(2);
  });
  it('pages count is 1 by default', () => {
    const pagesCount = getPagesCountByProps({ ...tableProps, paging: undefined });
    expect(pagesCount).toEqual(1);
  });
});

describe('areAllVisibleRowsSelected', () => {
  it('true', () => {
    const tableProps: ITableProps = {
      columns: [{ key: 'test', filterRowValue: 4, filterRowOperator: FilterOperatorName.LessThanOrEqual }],
      data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      selectedRows: [1, 2, 3, 5],
      rowKeyField: 'test',
      paging: {
        enabled: true,
        pageSize: 2
      }
    };
    const allFilteredRowsSelected = areAllVisibleRowsSelected(tableProps);
    expect(allFilteredRowsSelected).toBeTruthy();
  });
  it('false', () => {
    const tableProps: ITableProps = {
      columns: [{ key: 'id', filterRowValue: 4, filterRowOperator: FilterOperatorName.LessThanOrEqual }],
      data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      selectedRows: [1, 3, 5],
      rowKeyField: 'id',
      paging: {
        enabled: true,
        pageSize: 2
      }
    };
    const allFilteredRowsSelected = areAllVisibleRowsSelected(tableProps);
    expect(allFilteredRowsSelected).toBeFalsy();
  });
  it('false if selectedRows is undefined', () => {
    const tableProps: ITableProps = {
      columns: [{ key: 'id', filterRowValue: 4, filterRowOperator: FilterOperatorName.LessThanOrEqual }],
      data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      rowKeyField: 'id',
      paging: {
        enabled: true,
        pageSize: 2
      }
    };
    const allFilteredRowsSelected = areAllVisibleRowsSelected(tableProps);
    expect(allFilteredRowsSelected).toBeFalsy();
  });
});

describe('getSelectedData', () => {
  const propsInit: ITableProps = {
    data: [
      { id: 1, field: '11' },
      { id: 2, field: '22' },
      { id: 3, field: '33' },
    ],
    rowKeyField: 'id',
    columns: []
  }
  it('one item', () => {
    const props: ITableProps = {
      ...propsInit,
      selectedRows: [1]
    }
    expect(getSelectedData(props)).toMatchSnapshot();
  });
  it('two items', () => {
    const props: ITableProps = {
      ...propsInit,
      selectedRows: [1, 2]
    }
    expect(getSelectedData(props)).toMatchSnapshot();
  });
  it('selectedRows is empty', () => {
    const props: ITableProps = {
      ...propsInit
    }
    expect(getSelectedData(props).length).toEqual(0);
  });
  it('data is undefined', () => {
    const props: ITableProps = {
      ...propsInit,
      data: undefined,
      selectedRows: [1]
    }
    expect(getSelectedData(props).length).toEqual(0);
  });
  it('selectedRows are not found', () => {
    const props: ITableProps = {
      ...propsInit,
      selectedRows: [45]
    }
    expect(getSelectedData(props).length).toEqual(0);
  });
});
