import {
    deleteRow, deselectAllRows, deselectRow, selectAllRows, selectSingleRow, updateData
} from '../actionCreators';
import { ActionType } from '../enums';
import { kaReducer } from './kaReducer';

describe('kaReducer', () => {
  it('ScrollTable', () => {
    const scrollLeft = 10;
    const intialState = {
      columns: [],
      data: [],
      rowKeyField: '',
    };
    const newState = kaReducer(intialState, { type: ActionType.ScrollTable, scrollLeft });
    expect(newState).toEqual(intialState);
  });
  it('SelectAllRows', () => {
    const intialState = {
      columns: [],
      data: [{ id: 1 }, { id: 2 }],
      rowKeyField: 'id',
    };
    const newState = kaReducer(intialState, selectAllRows());
    expect(newState).toEqual({ ...intialState, selectedRows: [1, 2] });
  });
  it('SelectSingleRow', () => {
    const intialState = {
      columns: [],
      data: [{ id: 1 }, { id: 2 }],
      rowKeyField: 'id',
      selectedRows: [1],
    };
    const newState = kaReducer(intialState, selectSingleRow(2));
    expect(newState).toEqual({ ...intialState, selectedRows: [2] });
  });
  it('DeleteRow', () => {
    const intialState = {
      columns: [],
      data: [{ id: 1 }, { id: 2 }],
      rowKeyField: 'id',
    };
    const newState = kaReducer(intialState, deleteRow(2));
    expect(newState).toEqual({ ...intialState, data: [{ id: 1 }] });
  });
  it('DeselectAllRows', () => {
    const intialState = {
      columns: [],
      data: [{ id: 1 }, { id: 2 }],
      rowKeyField: 'id',
      selectedRows: [1, 2],
    };
    const newState = kaReducer(intialState, deselectAllRows());
    expect(newState).toEqual({ ...intialState, selectedRows: [] });
  });
  it('DeselectRow', () => {
    const intialState = {
      columns: [],
      data: [{ id: 1 }, { id: 2 }],
      rowKeyField: 'id',
      selectedRows: [1, 2],
    };
    const newState = kaReducer(intialState, deselectRow(2));
    expect(newState).toEqual({ ...intialState, selectedRows: [1] });
  });
  it('UpdateData', () => {
    const newData =  [{ id: 3 }, { id: 4 }];
    const intialState = {
      columns: [],
      data: [{ id: 1 }, { id: 2 }],
      rowKeyField: 'id',
      selectedRows: [1, 2],
    };
    const newState = kaReducer(intialState, updateData(newData));
    expect(newState.data).toEqual(newData);
  });
  it('ShowLoading', () => {
    const intialState = {
      loading: {
        enabled: false,
        text: 'test'
      }
    };
    const newState = kaReducer(intialState, { type: ActionType.ShowLoading });
    expect(newState.loading.enabled).toEqual(true);
    expect(newState.loading.text).toEqual('test');
  });
  it('ShowLoading - change text', () => {
    const intialState = {
      loading: {
        enabled: false,
        text: 'test'
      }
    };
    const newState = kaReducer(intialState, { type: ActionType.ShowLoading, text: '2' });
    expect(newState.loading.enabled).toEqual(true);
    expect(newState.loading.text).toEqual('2');
  });
  it('HideLoading', () => {
    const intialState = {
      loading: {
        enabled: true,
        text: 'test'
      }
    };
    const newState = kaReducer(intialState, { type: ActionType.HideLoading });
    expect(newState.loading.enabled).toEqual(false);
    expect(newState.loading.text).toEqual('test');
  });
  it('HideLoading', () => {
    const intialState = {
      loading: {
        enabled: true,
        text: 'test'
      }
    };
    const newState = kaReducer(intialState, { type: ActionType.HideLoading });
    expect(newState.loading.enabled).toEqual(false);
    expect(newState.loading.text).toEqual('test');
  });
  it('UpdatePageIndex', () => {
    const intialState = {
      paging: {
        enabled: true,
        pageIndex: 2,
      }
    };
    const newState = kaReducer(intialState, { type: ActionType.UpdatePageIndex, pageIndex: 5 });
    expect(newState.paging.enabled).toEqual(true);
    expect(newState.paging.pageIndex).toEqual(5);
  });
});
