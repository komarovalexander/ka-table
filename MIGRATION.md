# Migration guide

## From 12.x to 13.0.0

Five changes of 13.0.0 can break code written for 12.x:

1. [Keyboard navigation is enabled by default](#1-keyboard-navigation-is-enabled-by-default)
2. [A table without dispatch applies the props which the parent changes](#2-a-table-without-dispatch-applies-the-props-which-the-parent-changes)
3. [Values are unknown instead of any](#3-values-are-unknown-instead-of-any)
4. [Fixes of the data processing change some results](#4-fixes-of-the-data-processing-change-some-results)
5. [The package is built for ES2019 and has exports](#5-the-package-is-built-for-es2019-and-has-exports)

Sections 1, 2, 4 and 5 are about the behavior, section 3 is about TypeScript only. All the changes are listed in the [changelog](./CHANGELOG.md).

### 1. Keyboard navigation is enabled by default

The table is a WAI-ARIA grid (`role="grid"`) with a single Tab stop:

- Tab focuses a cell, the arrows move the focus between the cells (with Ctrl or Cmd to the last one), Home and End go to the first and the last cell of the row (with Ctrl or Cmd of the page);
- PageUp and PageDown change the page if `paging` is enabled;
- Enter and F2 open the editor of the cell if `editingMode` is `EditingMode.Cell`, the focus returns to the cell when the editor is closed;
- the group rows get the focus as rows: Enter, Space and the arrows Left and Right expand and collapse them;
- Enter and Space on the cell with the arrow of a tree row expand and collapse it, F2 opens the editor of this cell;
- the keys pressed in the editors and in other elements inside the cells are not handled.

The expand buttons of the groups and the arrows of the tree are not Tab stops: the keys of their cells expand and collapse the rows. A table with a tree is a WAI-ARIA treegrid, its rows tell their level and state (`aria-level`, `aria-expanded`).

The focused cell is stored in `focused.cell` (a focused group row in `focused.group`): focusing a cell (by a click or Tab) dispatches `SetFocused`. So:

- `customReducer`, `onDispatch` and the `dispatch` of a controlled table get `SetFocused` actions. A controlled table has to pass them to `kaReducer` as all the other actions, otherwise the focus doesn't move;
- the browser draws its focus outline around a cell focused by the keyboard. Style `.ka-cell:focus-visible` if it doesn't fit your theme.

To keep the behavior of 12.x, turn the navigation off (the expand buttons of the groups and the tree are Tab stops of their own then):

```tsx
<Table {...tableProps} keyboardNavigation={false} />
```

### 2. A table without dispatch applies the props which the parent changes

In 12.x a table without `dispatch` (it keeps its own state) took most props once, when it was mounted. Only `searchText`, `loading`, `data`, `columns`, `paging` and `selectedRows` (or the keys of `controlledPropsKeys`) followed the parent, and they were compared with the state of the table by reference. So any re-render of the parent reset the sorting, the column widths and the edited data.

In 13.0.0:

- all the props follow the parent: a prop is applied when the parent changes it. It is compared by value with the previous value which the parent passed, so the props created on every render (`columns={[...]}`, `paging={{ ... }}`) don't reset the state of the table;
- objects are merged by their changed fields, columns by their `key`: a new `title` of a column keeps the sorting and the width which the user set;
- a prop which the parent doesn't pass anymore becomes `undefined`;
- the functions (`format`, `filter`, `search`, `sort`, `validation`, `extendedFilter`, `extendedSort`) are not the state: the latest ones are used, also by the reducer and in `table.props`;
- while `loading.enabled` is true, `data`, `columns`, `paging` and `selectedRows` are applied when the loading ends;
- `controlledPropsKeys` limits the props which follow the parent, as in 12.x.

Check the code which relied on the old rules:

- **The parent changes a prop, but the table should keep its own value** (e.g. `groups` or `editableCells` which the parent passes as the initial value from its changing state): list only the props which should follow the parent in `controlledPropsKeys`:

  ```tsx
  <Table {...tableProps} controlledPropsKeys={['data', 'loading']} />
  ```

- **A re-render of the parent was used to reset the state of the table**: change the value of the prop, call an action of the table (e.g. `table.updateData(data)`) or mount a new table with another `key`.

### 3. Values are unknown instead of any

The public types have no `any`: the values of the cells (`value`, `editorValue`, `filterRowValue`) and the keys of the rows (`rowKeyValue`, `selectedRows`) are `unknown`, the actions are `TableAction`. JavaScript code doesn't change. TypeScript code has to check the type of a value before using it, or read the typed `rowData`.

#### The type of the rows

- `<Table data={rows} />` infers the type of the rows from `data`: `rowData` in `format`, `search`, `validation` and `childComponents` is `Row`.
- `useTable<Row>()` creates a typed instance: `table.props.data` is `Row[]`, and the table gets the type of the rows from it without `data`.
- `useTable()` without a type, `Column[]`, `ChildComponents` and the functions declared without the type of the rows don't change the type which comes from `data`.
- Without `data` and without a typed instance, set the type explicitly: `<Table<Row> ... />`.
- `ITableProps` without a type argument has `data?: unknown[]`: type the state of the table as `ITableProps<Row>`.

#### format

```tsx
// 12.x
format={({ column, value }) => {
    if (column.dataType === DataType.Date) {
        return value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' });
    }
}}

// 13.0.0
format={({ column, value }) => {
    if (column.dataType === DataType.Date) {
        return value instanceof Date && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' });
    }
}}
```

`format` returns a `ReactNode`; `undefined`, `null` and `false` show the value itself. The dates of a JSON are strings: `kaDateUtils.getDate(value)` converts them to dates (`'2021-11-08'` is the local date).

#### A cell which renders the value

```tsx
// 12.x
content: ({ value }) => <b>{value}</b>,

// 13.0.0: convert the value to a text...
content: ({ value }) => <b>{String(value ?? '')}</b>,
// ...or render a field of the typed row
content: ({ column, rowData }) => (column.key === 'name' ? <b>{rowData.name}</b> : undefined),
```

`content` returning `undefined` renders the default content of the cell.

#### validation

```tsx
// 12.x
validation={({ column, value }) => {
    if (column.key === 'name' && value.length > 50) {
        return 'The name is too long';
    }
}}

// 13.0.0
validation={({ column, value }) => {
    if (column.key === 'name' && typeof value === 'string' && value.length > 50) {
        return 'The name is too long';
    }
}}
```

#### A custom editor

```tsx
// 12.x
const NameEditor: React.FC<ICellEditorProps> = ({ column, dispatch, rowKeyValue, value }) => {
    const [editorValue, setEditorValue] = React.useState(value);
    // ...

// 13.0.0
const NameEditor: React.FC<ICellEditorProps> = ({ column, dispatch, rowKeyValue, value }) => {
    const [editorValue, setEditorValue] = React.useState(String(value ?? ''));
    // ...
```

#### Actions: customReducer, onDispatch and your own actions

`kaReducer`, `customReducer` and `onDispatch` get a `TableAction`: a union of the actions of the table, which is narrowed by `action.type`:

```tsx
onDispatch: (action) => {
    if (action.type === ActionType.SelectRow) {
        console.log(action.rowKeyValue);
    }
},
```

`dispatch` also accepts the actions of your own code (`CustomAction`: a `type` and any other fields). Add their type to the parameter of `customReducer` and `onDispatch`:

```tsx
interface ResetSearchAction { type: 'RESET_SEARCH' }

const table = useTable<Row>({
    customReducer: (nextState, action: TableAction | ResetSearchAction) => (
        action.type === 'RESET_SEARCH' ? { ...nextState, searchText: '' } : nextState
    ),
});
// ...
table.dispatch({ type: 'RESET_SEARCH' });
```

#### Other changed types

- `Column`: `filterRowOperator` is a `string`, `filterRowValue` is `unknown`, `headerFilterSearch` gets texts: `(value: string, searchValue: string, rowData?: HeaderFilterItem) => boolean`.
- `ChildComponent`: `content` returns a `ReactNode`, `elementAttributes` returns the attributes of an element (`ref` is a ref of an element).
- `IGroupRowProps.text` is a `ReactNode`: it is the result of `format`, which can be an element.
- `headerFilterPopupRow` and `headerFilterPopupTextCell` get the items of the header filter as `rowData` (`HeaderFilterItem`: `{ value: string, isSelected: boolean }`).

### 4. Fixes of the data processing change some results

- **Search** searches the text which the cells show, in the visible columns only: the result of `format` if it is a text or a number, otherwise the value. 12.x searched the values of all the columns, the hidden ones too. To search a hidden column, handle it in `search` (`undefined` keeps the default search of a column):

  ```tsx
  <Table
      columns={[{ key: 'name', title: 'Name' }, { key: 'email', visible: false }]}
      search={({ column, rowData, searchText }) => (
          column.key === 'email' ? rowData.email.includes(searchText) : undefined
      )}
      // ...
  />
  ```

- **Groups**: ungrouping a column (in the group panel or by `ungroupColumn`) keeps a group with settings (e.g. `enableSummary`) as `{ ...group, enabled: false }`, grouping the column again restores it (#336). Skip the disabled groups in the code which reads `groups`:

  ```ts
  const groupedColumnKeys = (table.props.groups || [])
      .filter((group) => group.enabled !== false)
      .map((group) => group.columnKey);
  ```

- **Collapsing** a group or a tree row keeps the groups and the rows of the other pages and the filtered ones expanded: `groupsExpanded` and `treeGroupsExpanded` list them too.
- **`clearAllFilters`** removes the `IsEmpty` and `IsNotEmpty` operators too, as they filter without a value.
- **Dates**: a date without time (`'2021-11-08'`) is the local date in the date filter and in the date editor (12.x took it as the UTC midnight, the previous day west of UTC). The date editor keeps the type of the value: a string stays a string, a timestamp stays a number.
- **`format` returning `0` or `''`** shows it: only `undefined`, `null` and `false` show the value itself.
- **Editing the key column** changes the key of the row: the row is not duplicated, and `selectedRows`, `detailsRows`, `treeGroupsExpanded`, the open editors and the focused cell move to the new key.
- **`deleteRow`** removes the key of the row from `selectedRows`, `detailsRows`, `treeGroupsExpanded`, `editableCells` and `focused`.
- **`selectAllVisibleRows`, `deselectAllVisibleRows` and `selectRowsRange`** use the keys of the rows of trees and groups (12.x added `undefined`).
- **The data is processed again only when the props which it uses change** (`data`, `columns`, `format`, `searchText`...), compared by reference. Change them immutably: a row pushed into the same array is not shown.

  ```ts
  // 12.x: data.push(newRow)
  setData([...data, newRow]);
  ```

### 5. The package is built for ES2019 and has exports

- The code is compiled for ES2019 (12.x was compiled for ES5). To support older browsers, transpile `ka-table` in `node_modules` with your bundler.
- The CommonJS modules are in the root of the package as in 12.x, the ES modules are in `esm/`, and `exports` chooses them for `require` and `import`. `exports` lists the package (`ka-table`), its modules (`ka-table/enums`, `ka-table/utils`, `ka-table/Components/...`) and the styles (`ka-table/style.css`, `ka-table/style.scss`, `ka-table/_default_theme.scss`); other files of the package can't be imported.
- Use one module format in an application: `import` and `require` load two copies of the package, which don't see the contexts and the instances of each other.
