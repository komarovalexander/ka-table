import { deselectRow } from '../actionCreators';
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
    const newState = kaReducer(intialState, ActionType.ScrollTable, { scrollLeft });
    expect(newState).toEqual(intialState);
  });
  it('SelectAllRows', () => {
    const intialState = {
      columns: [],
      data: [{ id: 1 }, { id: 2 }],
      rowKeyField: 'id',
    };
    const newState = kaReducer(intialState, ActionType.SelectAllRows);
    expect(newState).toEqual({ ...newState, selectedRows: [1, 2] });
  });
  it('SelectSingleRow', () => {
    const intialState = {
      columns: [],
      data: [{ id: 1 }, { id: 2 }],
      rowKeyField: 'id',
      selectedRows: [1],
    };
    const newState = kaReducer(intialState, ActionType.SelectSingleRow, { rowKeyValue: 2 });
    expect(newState).toEqual({ ...newState, selectedRows: [2] });
  });
  it('DeleteRow', () => {
    const intialState = {
      columns: [],
      data: [{ id: 1 }, { id: 2 }],
      rowKeyField: 'id',
    };
    const newState = kaReducer(intialState, ActionType.DeleteRow, { rowKeyValue: 2 });
    expect(newState).toEqual({ ...newState, data: [{ id: 1 }] });
  });
  it('DeselectAllRows', () => {
    const intialState = {
      columns: [],
      data: [{ id: 1 }, { id: 2 }],
      rowKeyField: 'id',
      selectedRows: [1, 2],
    };
    const newState = kaReducer(intialState, ActionType.DeselectAllRows, { });
    expect(newState).toEqual({ ...newState, selectedRows: [] });
  });
  it('DeselectRow', () => {
    const intialState = {
      columns: [],
      data: [{ id: 1 }, { id: 2 }],
      rowKeyField: 'id',
      selectedRows: [1, 2],
    };
    const newState = kaReducer(intialState, deselectRow(2));
    expect(newState).toEqual({ ...newState, selectedRows: [1] });
  });
});
