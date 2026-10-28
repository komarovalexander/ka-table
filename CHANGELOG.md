# Changelog

## 13.0.0 (not released yet)

13.0.0 has breaking changes: the [migration guide](./MIGRATION.md) describes what to change in the code written for 12.x.

### Breaking changes

- Keyboard navigation is enabled by default: the table is a WAI-ARIA grid with a single Tab stop, the arrows move the focus between the cells, Enter and F2 open the editors. `keyboardNavigation={false}` turns it off. [Details](./MIGRATION.md#1-keyboard-navigation-is-enabled-by-default)
- A table without `dispatch` applies all the props which the parent changes, compared by value, and always uses the latest functions (`format`, `search`, `validation`...). 12.x applied only six props, compared with the state by reference. [Details](./MIGRATION.md#2-a-table-without-dispatch-applies-the-props-which-the-parent-changes)
- The types have no `any`: the values of the cells and the keys of the rows are `unknown`, the actions are `TableAction`, the type of the rows is inferred from `data`. [Details](./MIGRATION.md#3-values-are-unknown-instead-of-any)
- Fixes of the data processing change some results: the search uses the text of `format` and the visible columns only, ungrouping keeps a group with settings as `enabled: false`, collapsing keeps the groups of the other pages expanded, and more. [Details](./MIGRATION.md#4-fixes-of-the-data-processing-change-some-results)
- The package is built for ES2019 (12.x was built for ES5) and contains ES modules chosen by `exports`. [Details](./MIGRATION.md#5-the-package-is-built-for-es2019-and-has-exports)
- `style.css` is plain CSS with custom properties (`--ka-*`), a theme overrides them; the package has no Sass files, `ka-table/style.scss` and `ka-table/_default_theme.scss` can't be imported. [Details](./MIGRATION.md#6-the-theme-is-plain-css-with-custom-properties)

### Added

- `keyboardNavigation` prop: the navigation by the cells of the WAI-ARIA grid pattern (treegrid for a tree), the focused cell is kept in `focused.cell`, a focused group row in `focused.group`. The group rows get the focus as rows, Enter, Space and the arrows Left and Right expand and collapse them; Enter and Space expand and collapse a tree row on the cell of its arrow.
- Keyboard and screen reader support of sorting, groups, the tree, paging, the group panel and the header filter: ARIA roles, states and names, the rows of a tree tell their level, the focus stays in the header filter popup and returns from it by Esc.
- The validation messages are announced and describe their editors (`aria-invalid`, `aria-describedby`, `role="alert"`), the editors get the id of the message as `validationMessageId`.
- `useTableSelector(table, selector, isEqual?)`: re-renders a component only when the selected part of the state of the table changes.
- `memoizedRows` prop: rows and cells are re-rendered only when their own props change.
- Typed instance and actions: `useTable<TData>()`, `useTableInstance<TData>()`, `ITableInstance<TData>`, `TableAction` and `CustomAction`, the `HeaderFilterItem` model.
- `Group.enabled`: a disabled group keeps its settings until its column is grouped again.
- `kaDateUtils.getDate`, `kaDateUtils.getDateFromInputValue`, `kaPagingUtils.getPageIndex` and `kaPagingUtils.getPagingWithPageSize`.
- ES modules in `esm/` and `sideEffects` for tree shaking.
- CSS custom properties of the default theme (`--ka-*`, listed in the readme): the hover colours of the rows and the cells, the sticky offsets of the header calculated from `--ka-header-cell-height`.

### Fixed

- A table without `dispatch` keeps its sorting, column widths and edited data when the parent re-renders with equal props (#480), uses the latest functions of the parent, also in `table.props` and `kaPropsUtils` (#482), and shows the changed data and the scroll position when it is mounted again with the same instance. `onDispatch` is called once per action in StrictMode.
- The reducer doesn't mutate the previous state (`UpdateHeaderFilterValues`, `SaveRowEditors` with validation, `ResizeColumn`).
- Selection: no duplicate keys in `selectedRows`, `selectRowsRange` with the key `0` or with a row which is not found, `areAllRowsSelected` checks every row and is `false` without rows.
- Trees: rows with keys like `'constructor'`, a parent with the key `0`, a row whose parent is not in the data or is the row itself is a root, the found rows keep their parents in the order of the data and stay sorted.
- A tree with more than about 110 000 shown rows under one root doesn't throw `RangeError: Maximum call stack size exceeded`.
- Groups: grouping by a date column with `format`, different groups for `null` and `undefined`, `groupItems` of a group with a summary contain only its rows, the summary of a group which is grouped again (#336).
- Editing: validation gets the row with all its edited values (also of a new row) and reads the value by `column.field`, nested `rowKeyField`, `openAllEditors` skips the columns which are not editable, Esc and Enter of a cell editor are handled only in its row, the string editor shows `0`, `updateCellValue` and `insertRow` with a key which is not in the data.
- Dates: the date editor and the date filter accept the dates of a JSON (strings) and timestamps, the date filter doesn't depend on the time zone.
- An unknown filter operator logs a warning instead of breaking the table.
- The page index stays inside the pages.
- `virtualScrolling` with `itemHeight: undefined` doesn't hang the page, with `enabled: false` it shows all the rows.
- The column resize keeps the `minWidth` of `colGroup.style`.
- `ComponentDidMount` and `singleAction` are dispatched once in StrictMode (the development mode).
- Drag and drop: rows and columns are dropped only on the items of the same kind and table.
- A nested field whose parent is `null` or a primitive gives `undefined` instead of throwing.
- The position of the header filter popup.

### Performance

- The values of the fields are read without copying the row: `getData()` of 10 000 rows with search, sorting and paging takes ~9 ms instead of ~125 ms.
- Filtering, sorting and grouping are calculated again only when the props which they use change: selection, editing and scrolling don't process the data again, a page change only slices it.
- `validate()` and saving all the editors find the rows by their keys instead of searching the data for every cell.

## 12.0.3

- `columns` is in the default `controlledPropsKeys`: a table without `dispatch` applies the columns which the parent changes.

The changes of the earlier versions are in the [commit history](https://github.com/komarovalexander/ka-table/commits/master).
