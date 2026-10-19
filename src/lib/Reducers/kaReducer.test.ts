import { ITableProps } from '../';
import {
    clearSingleAction, deleteRow, deselectAllFilteredRows, deselectAllRows, deselectAllVisibleRows,
    deselectRow, deselectRows, insertRow, loadData, openAllEditors, reorderColumns, reorderRows, resizeColumn,
    saveAllEditors, saveNewRow, saveRowEditors, selectAllFilteredRows, selectAllRows, selectAllVisibleRows,
    selectRow, selectRows, selectRowsRange, selectSingleRow, setSingleAction, updateCellValue, updateData,
    updateEditorValue, updateHeaderFilterValues, updatePopupPosition, updateRow, updateTreeGroupsExpanded,
    validate,
} from '../actionCreators';
import { ActionType, FilterOperatorName, InsertRowPosition } from '../enums';
import { deepFreeze } from '../../testUtils/deepFreeze';
import { kaReducer as kaReducerOriginal } from './kaReducer';
import { newRowId } from '../const';

// The state is deeply frozen in every test: a reducer which mutates the previous state throws a TypeError
const kaReducer = (state: any, action: any): any => kaReducerOriginal(deepFreeze(state), action);

describe('kaReducer', () => {
    describe('UpdateTreeGroupsExpanded ', () => {
        const intialState: ITableProps = {
            data: [
                { id: 1, treeGroupId: null },
                { id: 2, treeGroupId: 1 },
                { id: 3, treeGroupId: 2 },
                { id: 4, treeGroupId: 3 }
            ],
            columns: [{ key: 'id' }],
            rowKeyField: 'id',
            treeGroupKeyField: 'treeGroupId'
        };
        it('collapse tree group, if treeGroupsExpanded contains it', () => {
            const result: ITableProps = kaReducer({
                ...intialState,
                treeGroupsExpanded: [1, 2, 3]
            }, updateTreeGroupsExpanded(2));
            expect(result.treeGroupsExpanded).toEqual([1, 3]);
        });
        it('collapse tree group, if treeGroupsExpanded is undefined', () => {
            const result: ITableProps = kaReducer({
                ...intialState,
                treeGroupsExpanded: undefined
            }, updateTreeGroupsExpanded(2));
            expect(result.treeGroupsExpanded).toEqual([1, 3]);
        });
        it('expands tree group, if treeGroupsExpanded does not contain it', () => {
            const result: ITableProps = kaReducer({
                ...intialState,
                treeGroupsExpanded: [1, 3]
            }, updateTreeGroupsExpanded(2));
            expect(result.treeGroupsExpanded).toEqual([1, 3, 2]);
        });
    });
    describe('SelectRowsRange', () => {
        const intialState = {
            data: [
                { key: 1 },
                { key: 2 },
                { key: 3 },
                { key: 4 },
            ],
            columns: [{ key: 'key' }],
            rowKeyField: 'key',
        };
        it('default', () => {
            const result: ITableProps = kaReducer(intialState, selectRowsRange(2, 4));
            expect(result.selectedRows).toMatchSnapshot();
        });
        it('revert set', () => {
            const result: ITableProps = kaReducer(intialState, selectRowsRange(4, 2));
            expect(result.selectedRows).toMatchSnapshot();
        });
        it('rowKeyValueTo is not specified', () => {
            const result: ITableProps = kaReducer(intialState, selectRowsRange(2, null));
            expect(result.selectedRows).toMatchSnapshot();
        });
        it('selects only rowKeyValueFrom if rowKeyValueTo is not found', () => {
            const result: ITableProps = kaReducer(intialState, selectRowsRange(2, 7));
            expect(result.selectedRows).toEqual([2]);
        });
        it('selects only rowKeyValueFrom if rowKeyValueFrom is not found', () => {
            const result: ITableProps = kaReducer(intialState, selectRowsRange(7, 2));
            expect(result.selectedRows).toEqual([7]);
        });
        it('supports 0 as rowKeyValueTo', () => {
            const result: ITableProps = kaReducer({
                ...intialState,
                data: [{ key: 0 }, ...intialState.data],
            }, selectRowsRange(2, 0));
            expect(result.selectedRows).toEqual([0, 1, 2]);
        });
        it('does not duplicate already selected rows', () => {
            const result: ITableProps = kaReducer({
                ...intialState,
                selectedRows: [3],
            }, selectRowsRange(2, 4));
            expect(result.selectedRows).toEqual([3, 2, 4]);
        });
    });
    describe('DeselectRows', () => {
        it('deselects the rows', () => {
            const result: ITableProps = kaReducer({
                columns: [],
                rowKeyField: 'id',
                selectedRows: [1, 2, 3, 4],
            }, deselectRows([2, 4, 5]));
            expect(result.selectedRows).toEqual([1, 3]);
        });
    });
    describe('SelectRow', () => {
        it('does not duplicate selected rows', () => {
            const result: ITableProps = kaReducer({
                columns: [],
                rowKeyField: 'id',
                selectedRows: [1],
            }, selectRow(1));
            expect(result.selectedRows).toEqual([1]);
        });
    });
    describe('SelectRows', () => {
        it('does not duplicate selected rows', () => {
            const result: ITableProps = kaReducer({
                columns: [],
                rowKeyField: 'id',
                selectedRows: [1],
            }, selectRows([1, 2, 2, 3]));
            expect(result.selectedRows).toEqual([1, 2, 3]);
        });
    });
    describe('UpdateHeaderFilterValues', () => {
        const intialState: ITableProps = {
            columns: [{ key: 'name', headerFilterValues: ['a'] }, { key: 'id' }],
            rowKeyField: 'id',
        };
        it('adds a value', () => {
            const result: ITableProps = kaReducer(intialState, updateHeaderFilterValues('name', 'b', true));
            expect(result.columns[0].headerFilterValues).toEqual(['a', 'b']);
        });
        it('adds a value to a column without values', () => {
            const result: ITableProps = kaReducer(intialState, updateHeaderFilterValues('id', '1', true));
            expect(result.columns[1].headerFilterValues).toEqual(['1']);
        });
        it('does not duplicate a value', () => {
            const result: ITableProps = kaReducer(intialState, updateHeaderFilterValues('name', 'a', true));
            expect(result.columns[0].headerFilterValues).toEqual(['a']);
        });
        it('removes a value', () => {
            const result: ITableProps = kaReducer(intialState, updateHeaderFilterValues('name', 'a', false));
            expect(result.columns[0].headerFilterValues).toEqual([]);
        });
        it('keeps other columns as is', () => {
            const result: ITableProps = kaReducer(intialState, updateHeaderFilterValues('name', 'b', true));
            expect(result.columns[1]).toBe(intialState.columns[1]);
        });
    });
    describe('UpdateEditorValue', () => {
        const intialState: ITableProps = {
            columns: [{ key: 'name' }],
            editableCells: [{ rowKeyValue: 1, columnKey: 'name' }],
            rowKeyField: 'id',
        };
        it('updates editor value', () => {
            const result: ITableProps = kaReducer(intialState, updateEditorValue(1, 'name', 'new value'));
            expect(result.editableCells).toEqual([{ rowKeyValue: 1, columnKey: 'name', editorValue: 'new value' }]);
        });
        it('ignores a cell which is not being edited', () => {
            const result: ITableProps = kaReducer(intialState, updateEditorValue(2, 'name', 'new value'));
            expect(result).toBe(intialState);
        });
    });
    describe('SaveAllEditors', () => {
        it('saves editor values', () => {
            const result: ITableProps = kaReducer({
                columns: [{ key: 'name' }],
                data: [{ id: 1, name: 'a' }, { id: 2, name: 'b' }],
                editableCells: [{ rowKeyValue: 2, columnKey: 'name', editorValue: 'c' }],
                rowKeyField: 'id',
            }, saveAllEditors());
            expect(result.data).toEqual([{ id: 1, name: 'a' }, { id: 2, name: 'c' }]);
        });
        it('ignores editors of rows which are not in data', () => {
            const result: ITableProps = kaReducer({
                columns: [{ key: 'name' }],
                data: [{ id: 1, name: 'a' }],
                editableCells: [{ rowKeyValue: 2, columnKey: 'name', editorValue: 'c' }],
                rowKeyField: 'id',
            }, saveAllEditors());
            expect(result.data).toEqual([{ id: 1, name: 'a' }]);
            expect(Object.keys(result.data!)).toEqual(['0']);
        });
    });
    describe('SaveRowEditors', () => {
        const intialState: ITableProps = {
            columns: [{ key: 'name' }],
            data: [{ id: 1, name: 'a' }],
            editableCells: [{ rowKeyValue: 1, columnKey: 'name', editorValue: '' }],
            rowKeyField: 'id',
            validation: ({ value }) => value ? undefined : 'required',
        };
        it('sets validation messages if the row is not valid', () => {
            const result: ITableProps = kaReducer(intialState, saveRowEditors(1, { validate: true }));
            expect(result.editableCells).toEqual([{ rowKeyValue: 1, columnKey: 'name', editorValue: '', validationMessage: 'required' }]);
            expect(result.data).toBe(intialState.data);
        });
        it('saves the row if it is valid', () => {
            const result: ITableProps = kaReducer({
                ...intialState,
                editableCells: [{ rowKeyValue: 1, columnKey: 'name', editorValue: 'b' }],
            }, saveRowEditors(1, { validate: true }));
            expect(result.data).toEqual([{ id: 1, name: 'b' }]);
            expect(result.editableCells).toEqual([]);
        });
        it('supports a nested rowKeyField', () => {
            const result: ITableProps = kaReducer({
                columns: [{ key: 'name' }],
                data: [{ meta: { id: 1 }, name: 'a' }, { meta: { id: 2 }, name: 'b' }],
                editableCells: [{ rowKeyValue: 2, columnKey: 'name', editorValue: 'c' }],
                rowKeyField: 'meta.id',
            }, saveRowEditors(2));
            expect(result.data).toEqual([{ meta: { id: 1 }, name: 'a' }, { meta: { id: 2 }, name: 'c' }]);
        });
        it('does nothing if the row is not in data', () => {
            const state: ITableProps = {
                ...intialState,
                editableCells: [{ rowKeyValue: 5, columnKey: 'name', editorValue: 'b' }],
            };
            const result: ITableProps = kaReducer(state, saveRowEditors(5));
            expect(result).toBe(state);
        });
    });
    describe('SaveNewRow', () => {
        it('sets a nested rowKeyField of the new row', () => {
            const result: ITableProps = kaReducer({
                columns: [{ key: 'name' }],
                data: [{ meta: { id: 1 }, name: 'a' }],
                editableCells: [{ rowKeyValue: newRowId, columnKey: 'name', editorValue: 'b' }],
                rowKeyField: 'meta.id',
            }, saveNewRow(2));
            expect(result.data).toEqual([{ meta: { id: 2 }, name: 'b' }, { meta: { id: 1 }, name: 'a' }]);
            expect(result.editableCells).toEqual([]);
        });
        it('does nothing if the new row is not shown', () => {
            const intialState: ITableProps = {
                columns: [{ key: 'name' }],
                data: [{ id: 1, name: 'a' }],
                rowKeyField: 'id',
            };
            const result: ITableProps = kaReducer(intialState, saveNewRow(2));
            expect(result).toBe(intialState);
        });
    });
    describe('UpdateCellValue', () => {
        it('supports a nested rowKeyField', () => {
            const result: ITableProps = kaReducer({
                columns: [{ key: 'name' }],
                data: [{ meta: { id: 1 }, name: 'a' }, { meta: { id: 2 }, name: 'b' }],
                rowKeyField: 'meta.id',
            }, updateCellValue(2, 'name', 'c'));
            expect(result.data).toEqual([{ meta: { id: 1 }, name: 'a' }, { meta: { id: 2 }, name: 'c' }]);
        });
    });
    describe('UpdateRow', () => {
        it('supports a nested rowKeyField', () => {
            const result: ITableProps = kaReducer({
                columns: [{ key: 'name' }],
                data: [{ meta: { id: 1 }, name: 'a' }, { meta: { id: 2 }, name: 'b' }],
                rowKeyField: 'meta.id',
            }, updateRow({ meta: { id: 2 }, name: 'c' }));
            expect(result.data).toEqual([{ meta: { id: 1 }, name: 'a' }, { meta: { id: 2 }, name: 'c' }]);
        });
    });
    describe('OpenAllEditors', () => {
        it('does not open editors of columns which are not editable', () => {
            const result: ITableProps = kaReducer({
                columns: [{ key: 'id', isEditable: false }, { key: 'name' }],
                data: [{ id: 1, name: 'a' }, { id: 2, name: 'b' }],
                rowKeyField: 'id',
            }, openAllEditors());
            expect(result.editableCells).toEqual([
                { columnKey: 'name', rowKeyValue: 1 },
                { columnKey: 'name', rowKeyValue: 2 },
            ]);
        });
    });
    describe('UpdatePopupPosition', () => {
        it('updates the position of the shown popup only', () => {
            const intialState: ITableProps = {
                columns: [{ key: 'id' }, { key: 'name', isHeaderFilterPopupShown: true }],
                rowKeyField: 'id',
            };
            const result: ITableProps = kaReducer(intialState, updatePopupPosition({ x: 10, y: 20 }));
            expect(result.columns[0]).toBe(intialState.columns[0]);
            expect(result.columns[1].headerFilterPopupPosition).toEqual({ x: 10, y: 20 });
        });
    });
    describe('ReorderColumns', () => {
        it('default', () => {
            const intialState = {
                columns: [
                    { key: '1' },
                    { key: '2' },
                    { key: '3' },
                    { key: '4' },
                ],
                rowKeyField: 'id',
            };
            const result = kaReducer(intialState, reorderColumns('1', '3'));
            expect(result).toMatchSnapshot();
        });
    });
    describe('ReorderRows', () => {
        it('default', () => {
            const intialState = {
                data: [
                    { id: 1 },
                    { id: 2 },
                    { id: 3 },
                    { id: 4 },
                ],
                rowKeyField: 'id',
            };
            const result = kaReducer(intialState, reorderRows(1, 3));
            expect(result).toMatchSnapshot();
        });
        it('inner keys', () => {
            const intialState = {
                data: [
                    { a: { id: 1 } },
                    { a: { id: 2 } },
                    { a: { id: 3 } },
                    { a: { id: 4 } },
                ],
                rowKeyField: 'a.id',
            };
            const result = kaReducer(intialState, reorderRows(1, 3));
            expect(result).toMatchSnapshot();
        });
    });
    it('ScrollTable', () => {
        const scrollTop = 10;
        const intialState = {
            columns: [],
            data: [],
            rowKeyField: '',
        };
        const newState = kaReducer(intialState, { type: ActionType.ScrollTable, scrollTop });
        expect(newState).toEqual({ ...intialState, virtualScrolling: { scrollTop } });
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
    describe('SelectAllFilteredRows', () => {
        it('filter only', () => {
            const intialState: ITableProps = {
                columns: [{ key: 'id', filterRowValue: 2, filterRowOperator: FilterOperatorName.LessThanOrEqual }],
                data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
                rowKeyField: 'id',
            };
            const newState = kaReducer(intialState, selectAllFilteredRows());
            expect(newState).toEqual({ ...intialState, selectedRows: [1, 2] });
        });
        it('search', () => {
            const intialState: ITableProps = {
                columns: [{ key: 'id' }],
                data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
                rowKeyField: 'id',
                searchText: '1',
            };
            const newState = kaReducer(intialState, selectAllFilteredRows());
            expect(newState).toEqual({ ...intialState, selectedRows: [1] });
        });
    });

    describe('SelectAllVisibleRows', () => {
        it('default', () => {
            const intialState: ITableProps = {
                columns: [{ key: 'id', filterRowValue: 3, filterRowOperator: FilterOperatorName.LessThanOrEqual }],
                data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
                rowKeyField: 'id',
                paging: {
                    enabled: true,
                    pageSize: 2
                }
            };
            const newState = kaReducer(intialState, selectAllVisibleRows());
            expect(newState).toEqual({ ...intialState, selectedRows: [1, 2] });
        });
    });
    describe('DeselectAllVisibleRows', () => {
        it('default', () => {
            const intialState: ITableProps = {
                columns: [{ key: 'id', filterRowValue: 4, filterRowOperator: FilterOperatorName.LessThanOrEqual }],
                data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
                selectedRows: [1, 2, 3, 5],
                rowKeyField: 'id',
                paging: {
                    enabled: true,
                    pageSize: 2
                }
            };
            const newState = kaReducer(intialState, deselectAllVisibleRows());
            expect(newState).toEqual({ ...intialState, selectedRows: [3, 5] });
        });
    });

    describe('DeselectAllFilteredRows', () => {
        it('filter only', () => {
            const intialState: ITableProps = {
                columns: [{ key: 'id', filterRowValue: 2, filterRowOperator: FilterOperatorName.LessThanOrEqual }],
                data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
                selectedRows: [1, 2, 3],
                rowKeyField: 'id',
            };
            const newState = kaReducer(intialState, deselectAllFilteredRows());
            expect(newState).toEqual({ ...intialState, selectedRows: [3] });
        });
        it('search', () => {
            const intialState: ITableProps = {
                columns: [{ key: 'id' }],
                data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
                rowKeyField: 'id',
                selectedRows: [1, 2, 3],
                searchText: '1',
            };
            const newState = kaReducer(intialState, deselectAllFilteredRows());
            expect(newState).toEqual({ ...intialState, selectedRows: [2, 3] });
        });
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
        const newData = [{ id: 3 }, { id: 4 }];
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
    it('SetSingleAction', () => {
        const intialState = {};
        const newState = kaReducer(intialState, setSingleAction(loadData()));
        expect(newState.singleAction).toMatchSnapshot();
    });
    it('ClearSingleAction', () => {
        const intialState = {
            singleAction: loadData(),
        };
        const newState = kaReducer(intialState, clearSingleAction());
        expect(newState.singleAction).toBeUndefined();
    });
    describe('ResizeColumn', () => {
        it('has a width in settings', () => {
            const intialState = {
                columns: [{
                    key: 'id'
                }, {
                    key: 'name',
                    width: 100
                }],
            };
            const newState = kaReducer(intialState, resizeColumn('name', 200));
            expect(newState.columns).toMatchSnapshot();
        });
        it('has a col in settings', () => {
            const intialState = {
                columns: [{
                    key: 'id'
                }, {
                    key: 'name',
                    colGroup: {
                        style: { width: 100 }
                    }
                }],
            };
            const newState = kaReducer(intialState, resizeColumn('name', 200));
            expect(newState.columns).toMatchSnapshot();
        });
        it('has a col.width in settings', () => {
            const intialState = {
                columns: [{
                    key: 'id'
                }, {
                    key: 'name',
                    colGroup: {
                        width: 100
                    }
                }],
            };
            const newState = kaReducer(intialState, resizeColumn('name', 200));
            expect(newState.columns).toMatchSnapshot();
        });
        it('has styles only', () => {
            const intialState = {
                columns: [{
                    key: 'id'
                }, {
                    key: 'name',
                    style: {
                        width: 100
                    }
                }],
            };
            const newState = kaReducer(intialState, resizeColumn('name', 200));
            expect(newState.columns).toMatchSnapshot();
        });
    });
    describe('Validate', () => {
        it('validates values', () => {
            const intialState: ITableProps = {
                columns: [{
                    key: 'id'
                }, {
                    key: 'val'
                }],
                data: [{
                    id: 1,
                    val: 102
                }, {
                    id: 2,
                    val: 10
                }, {
                    id: 3,
                    val: 10
                }],
                rowKeyField: 'id',
                editableCells: [{
                    rowKeyValue: 1,
                    columnKey: 'val',
                }, {
                    rowKeyValue: 2,
                    columnKey: 'val',
                }],
                validation: ({ value }) => {
                    if (value > 100){
                        return 'value should be less than 100';
                    }
                }
            };
            const newState = kaReducer(intialState, validate());
            expect(newState.editableCells).toMatchSnapshot();
        });
        it('should use editor value', () => {
            const validationCalls = jest.fn();
            const intialState: ITableProps = {
                columns: [{
                    key: 'id'
                }, {
                    key: 'val'
                }],
                data: [{
                    id: 1,
                    val: 102
                }, {
                    id: 2,
                    val: 10
                }, {
                    id: 3,
                    val: 10
                }],
                rowKeyField: 'id',
                editableCells: [{
                    rowKeyValue: 1,
                    columnKey: 'val',
                }, {
                    rowKeyValue: 2,
                    editorValue: 103,
                    columnKey: 'val',
                }],
                validation: ({ value }) => {
                    validationCalls(value);
                    if (value > 100){
                        return 'value should be less than 100';
                    }
                }
            };
            const newState = kaReducer(intialState, validate());
            expect(validationCalls.mock.calls).toEqual([[102], [103]]);
            expect(newState.editableCells).toMatchSnapshot();
        });
        it('uses column.field to get the value of a cell without editor value', () => {
            const validation = jest.fn();
            kaReducer({
                columns: [{ key: 'name', field: 'user.name' }],
                data: [{ id: 1, user: { name: 'Mike' } }],
                editableCells: [{ rowKeyValue: 1, columnKey: 'name' }],
                rowKeyField: 'id',
                validation,
            }, validate());
            expect(validation).toHaveBeenCalledTimes(1);
            expect(validation.mock.calls[0][0].value).toBe('Mike');
        });
    });
    describe('InsertRow', () => {
        it('insert to 0 position by default', () => {
            const intialState: ITableProps = {
                columns: [],
                data: [{
                    id: 1,
                    val: 102
                }, {
                    id: 2,
                    val: 10
                }],
                rowKeyField: 'id'
            };
            const newState = kaReducer(intialState, insertRow({
                id: 3,
                val: 30
            }));
            expect(newState.data).toMatchSnapshot();
        });
        it('insert before row with id=2', () => {
            const intialState: ITableProps = {
                columns: [],
                data: [{
                    id: 1,
                    val: 102
                }, {
                    id: 2,
                    val: 10
                }],
                rowKeyField: 'id'
            };
            const newState = kaReducer(intialState, insertRow({
                id: 3,
                val: 30
            }, {
                rowKeyValue: 2
            }));
            expect(newState.data).toMatchSnapshot();
        });
        it('insert after row with id=2', () => {
            const intialState: ITableProps = {
                columns: [],
                data: [{
                    id: 1,
                    val: 102
                }, {
                    id: 2,
                    val: 10
                }, {
                    id: 3,
                    val: 10
                }],
                rowKeyField: 'id'
            };
            const newState = kaReducer(intialState, insertRow({
                id: 4,
                val: 40
            }, {
                rowKeyValue: 2,
                insertRowPosition: InsertRowPosition.after
            }));
            expect(newState.data).toMatchSnapshot();
        });
        it('insert to last position for after mode', () => {
            const intialState: ITableProps = {
                columns: [],
                data: [{
                    id: 1,
                    val: 102
                }, {
                    id: 2,
                    val: 10
                }, {
                    id: 3,
                    val: 10
                }],
                rowKeyField: 'id'
            };
            const newState = kaReducer(intialState, insertRow({
                id: 4,
                val: 40
            }, {
                insertRowPosition: InsertRowPosition.after
            }));
            expect(newState.data).toMatchSnapshot();
        });
    });
});
