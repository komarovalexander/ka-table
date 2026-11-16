import * as actionCreators from '../../Namespaces/actionCreators';

import {
    Bivariant,
    ControlledPropsKeys,
    CustomAction,
    CustomReducerFunc,
    DispatchFunc,
    FilterFunc,
    FormatFunc,
    LoadingSettings,
    NoData,
    NoInference,
    OnDispatchFunc,
    SearchFunc,
    SortFunc,
    TableAction,
    ValidationFunc,
} from '../../types';
import { EditableCell, PagingOptions } from '../../models';
import { EditingMode, FilteringMode, SortingMode } from '../../enums';

import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import { Focused } from '../../Models/Focused';
import { Group } from '../../Models/Group';
import { GroupPanelSettings } from '../../Models/GroupPanelSettings';
import { GroupedColumn } from '../../Models/GroupedColumn';
import { TableControlled } from '../TableControlled/TableControlled';
import { TableUncontrolled } from '../TableUncontrolled/TableUncontrolled';
import { VirtualScrolling } from '../../Models/VirtualScrolling';

type ActionCreators = typeof actionCreators;
// the methods of the instance dispatch the actions of the action creators
type ActionMethods = { [K in keyof ActionCreators]: (...args: Parameters<ActionCreators[K]>) => void };

export interface ITableInstance<TData = unknown> extends ActionMethods {
    props: ITableProps<TData>;
    // a method with a bivariant function: the instance of a table of the rows of a type is an instance of a table
    changeProps(value: ITableProps<TData> | Bivariant<(prevState: ITableProps<TData>) => ITableProps<TData>>): void;
    onDispatch: OnDispatchFunc<TData>;
    dispatch: DispatchFunc;
    customReducer?: CustomReducerFunc<TData>;
}

/**
 * The type of the rows (TData) is inferred from data and from the instance of useTable<TData>().
 * The other props (columns, childComponents, format, search...) get it and don't infer it,
 * so the ones declared without the type of the rows (e.g. Column[] or FormatFunc) keep the type of data
 */
export interface ITableProps<TData = unknown> {
    /**
     * Enables columns reordering using drag and drop
     * @group Data and columns
     */
    columnReordering?: boolean;
    /**
     * The columns are resized by the mouse. While a column is resized, the rows are not processed and rendered again:
     * they don't use the widths, and they are rendered with the new width when the mouse is released.
     * A controlled table doesn't render the rows only if the props which the parent passes keep their references
     * between its renders (dispatch, childComponents, format...), as with memoizedRows
     * @group Data and columns
     * @see {@link https://komarovalexander.github.io/ka-table/#/column-resizing | Column Resizing}
     */
    columnResizing?: boolean;
    /**
     * Columns in table and their look and behaviour
     * @group Data and columns
     */
    columns: Column<NoInference<TData>>[];
    /**
     * The props which the table with its own state (without dispatch) applies when the parent changes them.
     * By default these are all the props: they are compared by value and the objects are merged by the changed fields,
     * so the state of the table (sorting, page, widths...) is kept when the parent passes equal props again.
     * During a loading (loading.enabled) data, columns, paging and selectedRows are applied when the loading ends.
     * The functions (format, filter, search, sort, validation...) are not the state: the latest ones are always used.
     * @group State
     */
    controlledPropsKeys?: ControlledPropsKeys;
    /**
     * The Table's data. Change it immutably: the data is processed again when the reference changes
     * @group Data and columns
     */
    data?: TData[];
    /**
     * Keys of the rows whose details rows are shown
     * @group Selection, details rows and focus
     * @see {@link https://komarovalexander.github.io/ka-table/#/details-row | Details Row}
     */
    detailsRows?: unknown[];
    /**
     * Array of cells currently editing
     * @group Editing
     * @see {@link https://komarovalexander.github.io/ka-table/#/editing | Editing Example}
     */
    editableCells?: EditableCell[];
    /**
     * Sets the table's editing mode
     *
     * note: when *EditingMode.Cell* is enabled table calls *CloseEditor* action each time editor loses focus
     * @group Editing
     * @see {@link https://komarovalexander.github.io/ka-table/#/editing | Editing Example}
     */
    editingMode?: EditingMode;
    /**
     * Adds additional filtering layer
     * @group Filtering and search
     * @see {@link https://komarovalexander.github.io/ka-table/#/filter-extended | Filter Extended}
     */
    extendedFilter?: Bivariant<(data: NoInference<TData>[]) => NoInference<TData>[]>;
    /**
     * Sorts the data instead of the default sorting
     * @group Sorting
     * @see {@link https://komarovalexander.github.io/ka-table/#/sorting-extended | Sorting Extended}
     */
    extendedSort?: Bivariant<(data: NoInference<TData>[], columns: Column<NoInference<TData>>[]) => NoInference<TData>[]>;
    /**
     * Returns filter function
     * @group Filtering and search
     */
    filter?: FilterFunc<NoInference<TData>>;
    /**
     * Show filter UI elements in Table
     * @group Filtering and search
     * @see {@link https://komarovalexander.github.io/ka-table/#/filter-row | Filter Row Example}
     */
    filteringMode?: FilteringMode;
    /**
     * Stores information about the currently focused element: the cell or the group row (its key) focused by the
     * keyboard navigation
     * @group Selection, details rows and focus
     * @see {@link https://komarovalexander.github.io/ka-table/#/keyboard-navigation | Keyboard navigation}
     */
    focused?: Focused;
    /**
     * Returns the content of the cell; `undefined`, `null` and `false` show the value itself. The search, the groups
     * and the header filter use its text
     * @group Data and columns
     * @see {@link https://komarovalexander.github.io/ka-table/#/custom-cell | Custom Cell}
     */
    format?: FormatFunc<NoInference<TData>>;
    /**
     * @group Data and columns
     * @see {@link https://komarovalexander.github.io/ka-table/#/grouped-columns | Grouped Columns}
     */
    groupedColumns?: GroupedColumn[];
    /**
     * Allows users to select grouping columns in the UI.
     * @group Grouping and tree
     * @see {@link https://komarovalexander.github.io/ka-table/#/grouping | Grouping}
     */
    groupPanel?: GroupPanelSettings;
    /**
     * Groups in the table
     * @group Grouping and tree
     * @see {@link https://komarovalexander.github.io/ka-table/#/grouping | Grouping Example}
     */
    groups?: Group[];
    /**
     * Expanded groups - array of group keys
     * @group Grouping and tree
     */
    groupsExpanded?: unknown[][];
    /**
     * Height of the component
     * @group Appearance
     */
    height?: number | string;
    /**
     * Navigation by the cells with the keyboard (the grid pattern of WAI-ARIA, treegrid for a tree), enabled by default:
     * the table is a single stop of Tab, arrows move the focus between the cells (with Ctrl to the last one), Home and End
     * to the first and the last cell of the row (with Ctrl of the page), PageUp and PageDown change the page, Enter and F2 open the editor.
     * Group rows get the focus as rows: Enter, Space and the arrows Left and Right expand and collapse them.
     * Enter and Space on the cell of the arrow of a tree row expand and collapse it (F2 opens the editor of this cell).
     * The focus is kept in focused.cell (focused.group for a group row). false turns the navigation off, e.g. for an own handling of the keys.
     * @group Selection, details rows and focus
     * @see {@link https://komarovalexander.github.io/ka-table/#/keyboard-navigation | Keyboard navigation}
     */
    keyboardNavigation?: boolean;
    /**
     * Loading indicator options
     * @group Appearance
     * @see {@link https://komarovalexander.github.io/ka-table/#/loading | Loading}
     */
    loading?: LoadingSettings;
    /**
     * Rows and their cells are re-rendered only when their own props change, which is much faster for big tables.
     * Customizations of rows and cells (childComponents) have to render from their props then:
     * values read from table.props or from closures during rendering are not updated.
     * childComponents, format, validation and dispatch should keep their references between renders
     * (be declared outside of the component or memoized), otherwise all the rows are re-rendered.
     * @group Paging and virtual scrolling
     * @see {@link https://komarovalexander.github.io/ka-table/#/many-rows-memo | 300K Rows & memo}
     */
    memoizedRows?: boolean;
    /**
     * No data settings (for deeper UI customization childComponents.noDataRow also)
     * @group Appearance
     * @see {@link https://komarovalexander.github.io/ka-table/#/search | Search}
     */
    noData?: NoData,
    /**
     * The rows get the classes ka-odd and ka-even in turn, counted from the first row of the page, also with the virtual scrolling.
     * `'treeRoots'`: a root of a tree and all its children get the class of the root, the stripes change at the roots only
     * @group Appearance
     * @see {@link https://komarovalexander.github.io/ka-table/#/many-rows | 100K Rows}
     */
    oddEvenRows?: boolean | 'treeRoots';
    /**
     * Paging settings, `pagesCount` is set for remote paging
     * @group Paging and virtual scrolling
     * @see {@link https://komarovalexander.github.io/ka-table/#/paging | Paging}
     */
    paging?: PagingOptions;
    /**
     * Data's field which is used to identify row
     * @group Data and columns
     */
    rowKeyField: string;
    /**
     * Enables rows reordering using drag and drop
     * @group Data and columns
     */
    rowReordering?: boolean;
    /**
     * Overrides the default search method for the cell, `undefined` keeps the default search of the column. Executes if
     * `searchText` is set
     * @group Filtering and search
     */
    search?: SearchFunc<NoInference<TData>>;
    /**
     * Specifies the text for search by data: the text which the cells of the visible columns show is searched
     * @group Filtering and search
     * @see {@link https://komarovalexander.github.io/ka-table/#/search | Search Example}
     */
    searchText?: string;
    /**
     * Array of selected rows keys
     * @group Selection, details rows and focus
     * @see {@link https://komarovalexander.github.io/ka-table/#/selection | Selection Example}
     */
    selectedRows?: unknown[];
    /**
     * Is dispatched only once after Table render, after this action ka-table will dispatch `'ClearSingleAction'` to
     * set singleAction as undefined
     * @group State
     * @see {@link https://komarovalexander.github.io/ka-table/#/remote-data | Remote Data}
     */
    singleAction?: TableAction | CustomAction;
    /**
     * Returns the comparator of the sorted column, as the one of `Array.prototype.sort`: e.g. `Intl.Collator().compare`
     * or `(a, b) => a - b`. It sorts in the direction of the column
     * @group Sorting
     * @see {@link https://komarovalexander.github.io/ka-table/#/sorting-custom-logic | Sorting Custom Logic}
     */
    sort?: SortFunc<NoInference<TData>>;
    /**
     * Sorting mode.
     *
     * *Remote* - means only grid elements are updated but data should be sorted outside of the grid.
     *
     * *TripleState* - means: "ascend - descend - no sorting"
     * @group Sorting
     * @see {@link https://komarovalexander.github.io/ka-table/#/sorting | Sorting Example}
     */
    sortingMode?: SortingMode;
    /**
     * Sets the column key where tree expanded button will be rendered, by default it is rendered in the first column of
     * the table
     * @group Grouping and tree
     */
    treeExpandButtonColumnKey?: string;
    /**
     * Group key field
     * @group Grouping and tree
     * @see {@link https://komarovalexander.github.io/ka-table/#/tree-mode | Tree Mode}
     */
    treeGroupKeyField?: string;
    /**
     * Array of ids of expanded rows, if it is `undefined` - all rows are expanded
     * @group Grouping and tree
     * @see {@link https://komarovalexander.github.io/ka-table/#/tree-mode | Tree Mode}
     */
    treeGroupsExpanded?: unknown[];
    /**
     * Returns the validation error string or does not return anything in case of passed validation; `rowData` has the
     * edited values of the row
     * @group Editing
     * @see {@link https://komarovalexander.github.io/ka-table/#/validation | Validation Example}
     */
    validation?: ValidationFunc<NoInference<TData>>;
    /**
     * Virtual scrolling options of the rows and the columns
     * @group Paging and virtual scrolling
     * @see {@link https://komarovalexander.github.io/ka-table/#/many-rows | Many Rows Example}
     * @see {@link https://komarovalexander.github.io/ka-table/#/many-columns | Many Columns}
     */
    virtualScrolling?: VirtualScrolling;
    /**
     * Width of the component
     * @group Appearance
     */
    width?: number | string;
}

export interface ITableEvents {
    dispatch: DispatchFunc;
}

export interface ITableAllProps extends ITableEvents, ITableProps {
    childComponents?: ChildComponents;
}

export interface IKaTableProps<TData = unknown> extends ITableProps<TData> {
    /**
     * Customization logic for ka-table parts (cells, rows, editors, etc.)
     * @group Appearance
     * @see {@link https://komarovalexander.github.io/ka-table/#/events | Events}
     * @see {@link https://komarovalexander.github.io/ka-table/#/custom-cell | Custom Cell}
     */
    childComponents?: ChildComponents<NoInference<TData>>;
    /**
     * The function takes action as an argument, is used as a notification about any changes and events in the Table.
     * `dispatch` enables controlled mode in the table
     * @group State
     */
    dispatch?: DispatchFunc;
    /**
     * Object is used only by *uncontrolled mode* to get/set table props, use
     * [`useTable()`](https://ka-table.com/docs_hooks_utils.html#usetable) to create your own instance and handle
     * changes using `onDispatch`, and use
     * [`useTableInstance()`](https://ka-table.com/docs_hooks_utils.html#usetableinstance) to get instance of table from
     * context
     * @group State
     */
    // the instance of useTable() without the type of the rows doesn't change the type of data
    table?: ITableInstance<TData> | ITableInstance;
}

export const Table = <TData = unknown>(props: IKaTableProps<TData>) => {
    const { dispatch } = props;

    return dispatch ? (
        <TableControlled
            {...props}
            dispatch={dispatch}
        />
    ) : (
        <TableUncontrolled {...props} />
    );
};
