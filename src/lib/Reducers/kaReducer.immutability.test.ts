import * as actionCreators from '../actionCreators';

import { ActionType, InsertRowPosition, SortDirection, SortingMode } from '../enums';

import { ITableProps } from '../';
import { deepFreeze } from '../../testUtils/deepFreeze';
import { kaReducer } from './kaReducer';
import { newRowId } from '../const';

type ActionCreators = typeof actionCreators;

// Arguments for every action creator. A new action creator without arguments here is a type error,
// so every action is checked against a deeply frozen state: any mutation of it throws a TypeError.
const actionCreatorsArgs: { [K in keyof ActionCreators]: Parameters<ActionCreators[K]>[] } = {
    clearAllFilters: [[]],
    clearFocused: [[]],
    clearSingleAction: [[]],
    closeEditor: [[1, 'name']],
    closeRowEditors: [[1]],
    deleteRow: [[1]],
    deselectAllFilteredRows: [[]],
    deselectAllRows: [[]],
    deselectAllVisibleRows: [[]],
    deselectRow: [[1]],
    deselectRows: [[[1, 2]]],
    groupColumn: [['name']],
    hideColumn: [['name']],
    hideDetailsRow: [[1]],
    hideLoading: [[]],
    hideNewRow: [[]],
    insertColumn: [[{ key: 'new' }, 1]],
    insertRow: [[{ id: 10 }], [{ id: 10 }, { rowKeyValue: 2, insertRowPosition: InsertRowPosition.after }]],
    loadData: [[]],
    moveColumnBefore: [['name', 'id']],
    moveColumnToIndex: [['id', 2]],
    moveFocusedDown: [[], [{ end: true }]],
    moveFocusedLeft: [[], [{ end: true }]],
    moveFocusedRight: [[{}], [{ end: true }]],
    moveFocusedUp: [[], [{ end: true }]],
    openAllEditors: [[]],
    openEditor: [[3, 'name']],
    openRowEditors: [[2]],
    reorderColumns: [['id', 'name']],
    reorderRows: [[1, 3]],
    resizeColumn: [['id', 70], ['name', 120]],
    saveAllEditors: [[]],
    saveNewRow: [[10], [10, { validate: true }]],
    saveRowEditors: [[1], [1, { validate: true }]],
    search: [['a']],
    selectAllFilteredRows: [[]],
    selectAllRows: [[]],
    selectAllVisibleRows: [[]],
    selectRow: [[2]],
    selectRows: [[[2, 3]]],
    selectRowsRange: [[3, 1], [2, null]],
    selectSingleRow: [[2]],
    setFocused: [[{ cell: { columnKey: 'id', rowKeyValue: 2 } }]],
    setSingleAction: [[actionCreators.loadData()]],
    showColumn: [['name']],
    showDetailsRow: [[2]],
    showLoading: [[], ['Loading...']],
    showNewRow: [[]],
    ungroupColumn: [['group']],
    updateCellValue: [[1, 'name', 'z']],
    updateData: [[[{ id: 10 }]]],
    updateEditorValue: [[1, 'name', 'z'], [3, 'name', 'z']],
    updateFilterRowOperator: [['name', '=']],
    updateFilterRowValue: [['name', 'b']],
    updateGroupsExpanded: [[['x']], [['y']]],
    updateHeaderFilterPopupState: [['group']],
    updateHeaderFilterSearchValue: [['group', 'x']],
    updateHeaderFilterValues: [['group', 'z', true], ['group', 'x', false]],
    updatePageIndex: [[1]],
    updatePagesCount: [[3]],
    updatePageSize: [[5]],
    updatePopupPosition: [[{ x: 10, y: 20 }]],
    updateRow: [[{ id: 1, name: 'z' }]],
    updateSortDirection: [['name'], ['id']],
    updateTreeGroupsExpanded: [[1], [2]],
    validate: [[]],
};

const otherActions = [
    { type: ActionType.ComponentDidMount },
    { type: ActionType.ScrollTable, scrollTop: 10 },
    { type: ActionType.UpdateVirtualScrolling, virtualScrolling: { enabled: true, scrollTop: 5 } },
];

const validation = ({ value }: { value: any }) => value === '' ? 'required' : undefined;

const createState = (): ITableProps => ({
    columns: [{
        colGroup: { style: { width: 50 }, width: 50 },
        key: 'id',
        sortDirection: SortDirection.Ascend,
        style: { width: 50 },
    }, {
        key: 'name',
        width: 100,
    }, {
        headerFilterValues: ['x', 'y'],
        isHeaderFilterPopupShown: true,
        key: 'group',
    }],
    data: [
        { id: 1, name: 'a', group: 'x', parentId: null },
        { id: 2, name: 'b', group: 'x', parentId: 1 },
        { id: 3, name: 'c', group: 'y', parentId: 1 },
    ],
    detailsRows: [1],
    editableCells: [
        { rowKeyValue: 1, columnKey: 'name', editorValue: '' },
        { rowKeyValue: 2, columnKey: 'name' },
        { rowKeyValue: newRowId, columnKey: 'name', editorValue: 'new' },
    ],
    focused: { cell: { columnKey: 'name', rowKeyValue: 1 } },
    loading: { enabled: false, text: 'Loading' },
    paging: { enabled: true, pageIndex: 0, pageSize: 2 },
    rowKeyField: 'id',
    selectedRows: [1],
    sortingMode: SortingMode.Single,
    validation,
    virtualScrolling: { enabled: true, scrollTop: 0 },
});

const states: [string, () => ITableProps][] = [
    ['plain', createState],
    ['grouped', () => ({ ...createState(), groups: [{ columnKey: 'group' }], groupsExpanded: [['x']] })],
    ['grouped without groupsExpanded', () => ({ ...createState(), groups: [{ columnKey: 'group' }] })],
    ['tree', () => ({ ...createState(), treeGroupKeyField: 'parentId', treeGroupsExpanded: [1] })],
    ['tree without treeGroupsExpanded', () => ({ ...createState(), treeGroupKeyField: 'parentId' })],
];

const actions: [string, any][] = [
    ...Object.keys(actionCreatorsArgs).flatMap((actionCreatorName) =>
        (actionCreatorsArgs as any)[actionCreatorName].map((args: any[]): [string, any] => [
            `${actionCreatorName}(${args.map((arg) => JSON.stringify(arg)).join(', ')})`,
            (actionCreators as any)[actionCreatorName](...args),
        ])),
    ...otherActions.map((action): [string, any] => [action.type, action]),
];

describe('kaReducer does not mutate the previous state', () => {
    it.each(actions)('%s', (_, action) => {
        states.forEach(([stateName, getState]) => {
            const state = deepFreeze(getState());
            try {
                kaReducer(state, action);
            } catch (error) {
                throw new Error(`${stateName} state: ${(error as Error).message}`);
            }
        });
    });
});
