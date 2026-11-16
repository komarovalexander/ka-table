import { CustomAction, TableAction } from '../types';
import { ITableProps } from '../';
import {
    clearAllFilters, clearSingleAction, deleteRow, deselectAllFilteredRows, deselectAllRows, deselectAllVisibleRows,
    deselectRow, deselectRows, groupColumn, hideColumn, insertRow, loadData, moveColumnBefore, moveColumnToIndex, openAllEditors,
    reorderColumns, reorderRows, resizeColumn, saveAllEditors, saveNewRow, saveRowEditors, search, selectAllFilteredRows,
    selectAllRows, selectAllVisibleRows, selectRow, selectRows, selectRowsRange, selectSingleRow, setSingleAction, showColumn,
    ungroupColumn, updateCellValue, updateData, updateEditorValue, updateFilterRowOperator, updateFilterRowValue,
    updateGroupsExpanded, updateHeaderFilterValues, updatePageSize, updatePopupPosition, updateRow, updateTreeGroupsExpanded, validate,
} from '../actionCreators';
import { ActionType, FilterOperatorName, InsertRowPosition } from '../enums';
import { deepFreeze } from '../../testUtils/deepFreeze';
import { getData } from '../Utils/PropsUtils';
import { kaReducer as kaReducerOriginal } from './kaReducer';
import { newRowId } from '../const';

// The state is deeply frozen in every test: a reducer which mutates the previous state throws a TypeError.
// The state of a test can have only the props which the action uses
const kaReducer = <TData>(state: Partial<ITableProps<TData>>, action: TableAction | CustomAction): ITableProps<TData> => (
    kaReducerOriginal(deepFreeze(state) as ITableProps<TData>, action)
);

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
        it('skips the editors of the columns which are not in the table', () => {
            const result: ITableProps = kaReducer({
                ...intialState,
                editableCells: [{ rowKeyValue: 1, columnKey: 'name', editorValue: 'b' }, { rowKeyValue: 1, columnKey: 'removed', editorValue: 'c' }],
            }, saveRowEditors(1));
            expect(result.data).toEqual([{ id: 1, name: 'b' }]);
        });
        it('validates the row with all its edited values', () => {
            const state: ITableProps<{ id: number; start: number; end: number }> = {
                columns: [{ key: 'start' }, { key: 'end' }],
                data: [{ id: 1, start: 5, end: 10 }],
                editableCells: [
                    { rowKeyValue: 1, columnKey: 'start', editorValue: 20 },
                    { rowKeyValue: 1, columnKey: 'end', editorValue: 25 },
                ],
                rowKeyField: 'id',
                validation: ({ column, value, rowData }) => (column.key === 'start' && (value as number) > rowData.end ? 'start > end' : undefined),
            };
            expect(kaReducer(state, saveRowEditors(1, { validate: true })).data).toEqual([{ id: 1, start: 20, end: 25 }]);
            const invalid: ITableProps = kaReducer({
                ...state,
                editableCells: [{ rowKeyValue: 1, columnKey: 'start', editorValue: 30 }, { rowKeyValue: 1, columnKey: 'end', editorValue: 25 }],
            }, saveRowEditors(1, { validate: true }));
            expect(invalid.data).toEqual(state.data);
            expect(invalid.editableCells).toEqual([
                { rowKeyValue: 1, columnKey: 'start', editorValue: 30, validationMessage: 'start > end' },
                { rowKeyValue: 1, columnKey: 'end', editorValue: 25, validationMessage: undefined },
            ]);
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
        it('validates the new row with its edited values', () => {
            const state: ITableProps<{ id: number; start: number; end: number }> = {
                columns: [{ key: 'start' }, { key: 'end' }],
                data: [],
                editableCells: [
                    { rowKeyValue: newRowId, columnKey: 'start', editorValue: 1 },
                    { rowKeyValue: newRowId, columnKey: 'end', editorValue: 2 },
                ],
                rowKeyField: 'id',
                // rowData is the new row: it is not in the data yet
                validation: ({ column, value, rowData }) => (column.key === 'start' && (value as number) > rowData.end ? 'start > end' : undefined),
            };
            expect(kaReducer(state, saveNewRow(5, { validate: true })).data).toEqual([{ id: 5, start: 1, end: 2 }]);
            const invalid: ITableProps = kaReducer({
                ...state,
                editableCells: [{ rowKeyValue: newRowId, columnKey: 'start', editorValue: 3 }, { rowKeyValue: newRowId, columnKey: 'end', editorValue: 2 }],
            }, saveNewRow(5, { validate: true }));
            expect(invalid.data).toEqual([]);
            expect(invalid.editableCells![0].validationMessage).toBe('start > end');
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
        it('does not change the columns when a column is not in them', () => {
            const intialState = {
                columns: [{ key: '1' }, { key: '2' }],
                rowKeyField: 'id',
            };
            expect(kaReducer(intialState, reorderColumns('unknown', '2')).columns).toEqual(intialState.columns);
            expect(kaReducer(intialState, reorderColumns('1', 'unknown')).columns).toEqual(intialState.columns);
            expect(kaReducer(intialState, moveColumnBefore('unknown', '2')).columns).toEqual(intialState.columns);
            expect(kaReducer(intialState, moveColumnBefore('1', 'unknown')).columns).toEqual(intialState.columns);
            expect(kaReducer(intialState, moveColumnToIndex('unknown', 0)).columns).toEqual(intialState.columns);
        });
    });
    describe('GroupColumn', () => {
        const intialState = {
            columns: [{ key: 'name' }, { key: 'city' }],
            rowKeyField: 'id',
        };
        it('groups a column', () => {
            const result = kaReducer(intialState, groupColumn('city'));
            expect(result.groups).toEqual([{ columnKey: 'city' }]);
            expect(kaReducer(result, groupColumn('name')).groups).toEqual([{ columnKey: 'city' }, { columnKey: 'name' }]);
        });
        it('does not group a column which is not in the table or is grouped already', () => {
            expect(kaReducer(intialState, groupColumn('unknown'))).toEqual(intialState);
            const grouped = kaReducer(intialState, groupColumn('city'));
            expect(kaReducer(grouped, groupColumn('city'))).toEqual(grouped);
        });
    });
    describe('the first page is shown after the rows are filtered or searched', () => {
        const intialState: ITableProps = {
            columns: [{ key: 'name' }, { key: 'score', filterRowValue: 10 }, { key: 'city' }],
            data: [],
            rowKeyField: 'id',
            paging: { enabled: true, pageIndex: 3, pageSize: 10 },
        };
        it.each([
            ['Search', search('text')],
            ['UpdateFilterRowValue', updateFilterRowValue('name', 'text')],
            ['UpdateFilterRowOperator of a filtered column', updateFilterRowOperator('score', FilterOperatorName.LessThan)],
            ['UpdateHeaderFilterValues', updateHeaderFilterValues('city', 'London', true)],
            ['ClearAllFilters', clearAllFilters()],
        ])('%s', (_, action) => {
            expect(kaReducer(intialState, action).paging).toEqual({ enabled: true, pageIndex: 0, pageSize: 10 });
        });
        it('UpdateFilterRowOperator of a column which is not filtered keeps the page', () => {
            expect(kaReducer(intialState, updateFilterRowOperator('name', FilterOperatorName.Contains)).paging).toBe(intialState.paging);
        });
        it('the state without paging is not changed', () => {
            const state = { ...intialState, paging: undefined };
            expect(kaReducer(state, search('text'))).toEqual({ ...state, searchText: 'text' });
        });
    });
    it('UpdatePageSize keeps the first row of the page shown', () => {
        const intialState = {
            paging: { enabled: true, pageIndex: 4, pageSize: 10 },
        };
        expect(kaReducer(intialState, updatePageSize(20)).paging).toEqual({ enabled: true, pageIndex: 2, pageSize: 20 });
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
        it('does not change the data when a row is not in it', () => {
            const intialState = {
                data: [{ id: 1 }, { id: 2 }, { id: 3 }],
                rowKeyField: 'id',
            };
            expect(kaReducer(intialState, reorderRows(999, 3)).data).toEqual(intialState.data);
            expect(kaReducer(intialState, reorderRows(1, 999)).data).toEqual(intialState.data);
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
        // the columns are scrolled too with virtualScrolling.horizontal, scrollLeft is kept when it is not passed
        const scrolledState = kaReducer(newState, { type: ActionType.ScrollTable, scrollTop, scrollLeft: 300 });
        expect(scrolledState.virtualScrolling).toEqual({ scrollTop, scrollLeft: 300 });
        expect(kaReducer(scrolledState, { type: ActionType.ScrollTable, scrollTop: 20 }).virtualScrolling).toEqual({ scrollTop: 20, scrollLeft: 300 });
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
        expect(newState.loading?.enabled).toEqual(true);
        expect(newState.loading?.text).toEqual('test');
    });
    it('ShowLoading - change text', () => {
        const intialState = {
            loading: {
                enabled: false,
                text: 'test'
            }
        };
        const newState = kaReducer(intialState, { type: ActionType.ShowLoading, text: '2' });
        expect(newState.loading?.enabled).toEqual(true);
        expect(newState.loading?.text).toEqual('2');
    });
    it('HideLoading', () => {
        const intialState = {
            loading: {
                enabled: true,
                text: 'test'
            }
        };
        const newState = kaReducer(intialState, { type: ActionType.HideLoading });
        expect(newState.loading?.enabled).toEqual(false);
        expect(newState.loading?.text).toEqual('test');
    });
    it('HideLoading', () => {
        const intialState = {
            loading: {
                enabled: true,
                text: 'test'
            }
        };
        const newState = kaReducer(intialState, { type: ActionType.HideLoading });
        expect(newState.loading?.enabled).toEqual(false);
        expect(newState.loading?.text).toEqual('test');
    });
    it('UpdatePageIndex', () => {
        const intialState = {
            paging: {
                enabled: true,
                pageIndex: 2,
            }
        };
        const newState = kaReducer(intialState, { type: ActionType.UpdatePageIndex, pageIndex: 5 });
        expect(newState.paging?.enabled).toEqual(true);
        expect(newState.paging?.pageIndex).toEqual(5);
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
        it('validation gets the row with the values of all its editors', () => {
            const validation = vi.fn();
            kaReducer({
                columns: [{ key: 'start' }, { key: 'end' }],
                data: [{ id: 1, start: 5, end: 10 }],
                editableCells: [{ rowKeyValue: 1, columnKey: 'start', editorValue: 20 }, { rowKeyValue: 1, columnKey: 'end' }],
                rowKeyField: 'id',
                validation,
            }, validate());
            expect(validation).toHaveBeenCalledWith({ column: { key: 'start' }, rowData: { id: 1, start: 20, end: 10 }, value: 20 });
            expect(validation).toHaveBeenCalledWith({ column: { key: 'end' }, rowData: { id: 1, start: 20, end: 10 }, value: 10 });
        });
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
                    if ((value as number) > 100){
                        return 'value should be less than 100';
                    }
                }
            };
            const newState = kaReducer(intialState, validate());
            expect(newState.editableCells).toMatchSnapshot();
        });
        it('should use editor value', () => {
            const validationCalls = vi.fn();
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
                    if ((value as number) > 100){
                        return 'value should be less than 100';
                    }
                }
            };
            const newState = kaReducer(intialState, validate());
            expect(validationCalls.mock.calls).toEqual([[102], [103]]);
            expect(newState.editableCells).toMatchSnapshot();
        });
        it('uses column.field to get the value of a cell without editor value', () => {
            const validation = vi.fn();
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
    describe('a key which is not in the table', () => {
        const intialState: ITableProps<{ id: number }> = {
            columns: [{ key: 'id' }, { key: 'name' }],
            data: [{ id: 1 }, { id: 2 }, { id: 3 }],
            rowKeyField: 'id',
        };
        it.each([
            ['HideColumn', hideColumn('typo')],
            ['ShowColumn', showColumn('typo')],
            ['UpdateFilterRowValue', updateFilterRowValue('typo', 'a')],
            ['UpdateFilterRowOperator', updateFilterRowOperator('typo', FilterOperatorName.IsEmpty)],
        ])('%s does not add a column', (_, action) => {
            expect(kaReducer(intialState, action).columns).toEqual(intialState.columns);
        });
        it('InsertRow next to a row which is not in the data inserts the row at the start or at the end', () => {
            const getIds = (action: ReturnType<typeof insertRow>) => kaReducer(intialState, action).data?.map((d) => d.id);
            expect(getIds(insertRow({ id: 4 }, { rowKeyValue: 99 }))).toEqual([4, 1, 2, 3]);
            expect(getIds(insertRow({ id: 4 }, { rowKeyValue: 99, insertRowPosition: InsertRowPosition.after }))).toEqual([1, 2, 3, 4]);
        });
        it('UpdateCellValue of a row or a column which is not in the table changes nothing', () => {
            expect(kaReducer(intialState, updateCellValue(99, 'name', 'x'))).toBe(intialState);
            expect(kaReducer(intialState, updateCellValue(1, 'typo', 'x'))).toBe(intialState);
        });
    });
    describe('DeleteRow removes the key of the row', () => {
        it('from the selected, the details, the expanded and the edited rows and from the focused cell', () => {
            const intialState: ITableProps = {
                columns: [{ key: 'name' }],
                data: [{ id: 1 }, { id: 2 }],
                detailsRows: [1, 2],
                editableCells: [{ rowKeyValue: 1, columnKey: 'name' }, { rowKeyValue: 2, columnKey: 'name' }],
                focused: { cell: { rowKeyValue: 1, columnKey: 'name' } },
                rowKeyField: 'id',
                selectedRows: [1, 2],
                treeGroupsExpanded: [1, 2],
            };
            expect(kaReducer(intialState, deleteRow(1))).toEqual({
                ...intialState,
                data: [{ id: 2 }],
                detailsRows: [2],
                editableCells: [{ rowKeyValue: 2, columnKey: 'name' }],
                focused: { cell: undefined },
                selectedRows: [2],
                treeGroupsExpanded: [2],
            });
        });
        it('keeps the props without the key', () => {
            const intialState: ITableProps = { columns: [], data: [{ id: 1 }, { id: 2 }], rowKeyField: 'id', selectedRows: [2] };
            expect(kaReducer(intialState, deleteRow(1)).selectedRows).toBe(intialState.selectedRows);
        });
    });
    describe('IsEmpty and IsNotEmpty filter without a value', () => {
        const intialState: ITableProps = {
            columns: [
                { key: 'name', filterRowOperator: FilterOperatorName.IsEmpty },
                { key: 'score', filterRowOperator: FilterOperatorName.MoreThan, filterRowValue: 5 },
            ],
            data: [{ id: 1, name: 'a', score: 1 }, { id: 2, name: '', score: 10 }],
            paging: { enabled: true, pageIndex: 1, pageSize: 1 },
            rowKeyField: 'id',
        };
        it('ClearAllFilters clears their operators', () => {
            const result: ITableProps = kaReducer(intialState, clearAllFilters());
            expect(result.columns.map((c) => c.filterRowOperator)).toEqual([undefined, FilterOperatorName.MoreThan]);
            expect(getData({ ...result, paging: undefined })).toEqual(intialState.data);
        });
        it('UpdateFilterRowOperator shows the first page when they are set or changed', () => {
            const state: ITableProps = { ...intialState, columns: [{ key: 'name' }] };
            expect(kaReducer(state, updateFilterRowOperator('name', FilterOperatorName.IsNotEmpty)).paging).toEqual({ ...state.paging, pageIndex: 0 });
            const filtered: ITableProps = { ...intialState, columns: [{ key: 'name', filterRowOperator: FilterOperatorName.IsEmpty }] };
            expect(kaReducer(filtered, updateFilterRowOperator('name', FilterOperatorName.Contains)).paging).toEqual({ ...state.paging, pageIndex: 0 });
        });
    });
    describe('the keys of the shown rows of a tree and of groups', () => {
        const treeState: ITableProps = {
            columns: [{ key: 'name' }],
            data: [{ id: 1, parentId: null }, { id: 2, parentId: 1 }, { id: 3, parentId: null }],
            rowKeyField: 'id',
            treeGroupKeyField: 'parentId',
        };
        const groupsState: ITableProps = {
            columns: [{ key: 'type' }, { key: 'name' }],
            data: [{ id: 1, type: 'a' }, { id: 2, type: 'b' }],
            groups: [{ columnKey: 'type' }],
            rowKeyField: 'id',
        };
        it('SelectAllVisibleRows', () => {
            expect(kaReducer(treeState, selectAllVisibleRows()).selectedRows).toEqual([1, 2, 3]);
            expect(kaReducer(groupsState, selectAllVisibleRows()).selectedRows).toEqual([1, 2]);
        });
        it('DeselectAllVisibleRows', () => {
            expect(kaReducer({ ...treeState, selectedRows: [1, 2, 5] }, deselectAllVisibleRows()).selectedRows).toEqual([5]);
        });
        it('SelectRowsRange', () => {
            expect(kaReducer(treeState, selectRowsRange(1, 3)).selectedRows).toEqual([1, 2, 3]);
            expect(kaReducer(groupsState, selectRowsRange(2, 1)).selectedRows).toEqual([1, 2]);
        });
    });
    describe('collapsing with paging and filters', () => {
        it('UpdateGroupsExpanded keeps the groups of the other pages and the filtered groups expanded', () => {
            const data = ['A', 'B', 'C', 'D'].flatMap((country, index) => [0, 1, 2].map((i) => ({ id: index * 3 + i, country })));
            const intialState: ITableProps = {
                columns: [{ key: 'country', filterRowValue: 'D', filterRowOperator: FilterOperatorName.IsNotEqual }, { key: 'id' }],
                data,
                groups: [{ columnKey: 'country' }],
                paging: { enabled: true, pageSize: 5 },
                rowKeyField: 'id',
            };
            expect(kaReducer(intialState, updateGroupsExpanded(['A'])).groupsExpanded).toEqual([['B'], ['C'], ['D']]);
        });
        it('UpdateTreeGroupsExpanded keeps the rows of the other pages and the filtered rows expanded', () => {
            const data = [1, 2, 3, 4].flatMap((id) => [{ id, parentId: null }, { id: id * 10, parentId: id }]);
            const intialState: ITableProps = {
                columns: [{ key: 'id', filterRowValue: 30, filterRowOperator: FilterOperatorName.LessThan }],
                data,
                paging: { enabled: true, pageSize: 4 },
                rowKeyField: 'id',
                treeGroupKeyField: 'parentId',
            };
            expect(kaReducer(intialState, updateTreeGroupsExpanded(1)).treeGroupsExpanded).toEqual([2, 3, 4]);
        });
    });
    describe('editing of the key column', () => {
        const intialState: ITableProps = {
            columns: [{ key: 'id' }, { key: 'name' }],
            data: [{ id: 1, name: 'a' }, { id: 2, name: 'b' }],
            detailsRows: [1],
            focused: { cell: { columnKey: 'id', rowKeyValue: 1 } },
            rowKeyField: 'id',
            selectedRows: [1, 2],
        };
        it('UpdateCellValue replaces the row and moves its key', () => {
            const result: ITableProps = kaReducer({ ...intialState, editableCells: [{ rowKeyValue: 1, columnKey: 'id' }] }, updateCellValue(1, 'id', 10));
            expect(result.data).toEqual([{ id: 10, name: 'a' }, { id: 2, name: 'b' }]);
            expect(result.selectedRows).toEqual([10, 2]);
            expect(result.detailsRows).toEqual([10]);
            expect(result.focused).toEqual({ cell: { columnKey: 'id', rowKeyValue: 10 } });
            // closeEditor which follows updateCellValue in the cell editing has the previous key
            expect(result.editableCells).toEqual([{ rowKeyValue: 1, columnKey: 'id' }]);
        });
        it('UpdateCellValue does not replace the row with the new key', () => {
            expect(kaReducer(intialState, updateCellValue(1, 'id', 2)).data).toEqual([{ id: 2, name: 'a' }, { id: 2, name: 'b' }]);
        });
        it('SaveRowEditors replaces the row and moves its key', () => {
            const result: ITableProps = kaReducer({
                ...intialState,
                editableCells: [{ rowKeyValue: 1, columnKey: 'id', editorValue: 10 }, { rowKeyValue: 1, columnKey: 'name', editorValue: 'c' }],
            }, saveRowEditors(1));
            expect(result.data).toEqual([{ id: 10, name: 'c' }, { id: 2, name: 'b' }]);
            expect(result.selectedRows).toEqual([10, 2]);
            expect(result.editableCells).toEqual([]);
        });
        it('SaveAllEditors saves all the editors of the rows and moves the keys of the editors', () => {
            const result: ITableProps = kaReducer({
                ...intialState,
                editableCells: [
                    { rowKeyValue: 1, columnKey: 'id', editorValue: 2 },
                    { rowKeyValue: 1, columnKey: 'name', editorValue: 'c' },
                    { rowKeyValue: 2, columnKey: 'id', editorValue: 1 },
                    { rowKeyValue: 2, columnKey: 'name', editorValue: 'd' },
                ],
            }, saveAllEditors());
            // the keys of the rows are swapped
            expect(result.data).toEqual([{ id: 2, name: 'c' }, { id: 1, name: 'd' }]);
            expect(result.selectedRows).toEqual([2, 1]);
            expect(result.detailsRows).toEqual([2]);
            expect(result.editableCells!.map((cell) => cell.rowKeyValue)).toEqual([2, 2, 1, 1]);
        });
    });
    describe('UngroupColumn and GroupColumn', () => {
        const intialState: ITableProps = {
            columns: [{ key: 'type' }, { key: 'name' }, { key: 'city' }],
            groups: [{ columnKey: 'type', enableSummary: true }, { columnKey: 'city' }],
            rowKeyField: 'id',
        };
        it('keep the settings of a group (#336)', () => {
            const ungrouped: ITableProps = kaReducer(intialState, ungroupColumn('type'));
            expect(ungrouped.groups).toEqual([{ columnKey: 'type', enableSummary: true, enabled: false }, { columnKey: 'city' }]);
            expect(kaReducer(ungrouped, groupColumn('type')).groups).toEqual([{ columnKey: 'city' }, { columnKey: 'type', enableSummary: true }]);
        });
        it('remove a group without settings', () => {
            expect(kaReducer(intialState, ungroupColumn('city')).groups).toEqual([{ columnKey: 'type', enableSummary: true }]);
            const state: ITableProps = { ...intialState, groups: [{ columnKey: 'type', enableSummary: false }] };
            expect(kaReducer(state, ungroupColumn('type')).groups).toBeUndefined();
        });
        it('enable a disabled group of the props', () => {
            expect(kaReducer({ ...intialState, groups: [{ columnKey: 'city', enabled: false }] }, groupColumn('city')).groups).toEqual([{ columnKey: 'city' }]);
        });
    });
});
