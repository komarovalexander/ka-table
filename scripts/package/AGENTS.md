# ka-table: notes for AI coding agents

ka-table is a React table (data grid) with sorting, filtering, search, grouping with summaries, tree data,
editing with validation, selection, paging, virtual scrolling and keyboard navigation built in.
MIT, no dependencies besides React 18 or 19.

This file describes the installed version (13.x). Trust it and the types of the package (`.d.ts` with JSDoc)
over what you remember: 13.0 changed the API of 12.x.

## Minimal table

    import 'ka-table/style.css'; // once; plain CSS, the package has no Sass files
    import { DataType, SortingMode, Table } from 'ka-table';

    <Table
      columns={[{ key: 'name', title: 'Name', dataType: DataType.String }]}
      data={rows}        // replace the array to change the data, don't mutate it
      rowKeyField="id"   // required: the field which identifies a row
      sortingMode={SortingMode.Single}
    />

## Rules

- A table without `dispatch` keeps its own state and applies the props which the parent changes.
- To call actions and read the state, create an instance: `const table = useTable<Row>()`, `<Table table={table} />`.
  Its methods are the actions (`table.selectRow(key)`, `table.updatePageIndex(0)`), `table.props` is the state.
  `useTableSelector(table, (props) => props.selectedRows)` re-renders your component when the value changes.
- `useTable({ onDispatch, customReducer })` sees every action (`action.type` is an `ActionType`).
  Data from a server: `paging.pagesCount`, the `...Remote` sorting modes, load the data in `onDispatch`.
- Pass `dispatch` only when the state has to live in your code (Redux, the URL): keep it as `ITableProps<Row>`
  and apply every action with `kaReducer`, `SetFocused` too, otherwise the focus doesn't move.
- The values of the cells and the keys of the rows are `unknown`: narrow them, or read the typed `rowData`.
- Customize cells, rows, editors and the other parts with `childComponents`: `content` renders a part,
  `elementAttributes` adds attributes and event handlers to its element.
- With `memoizedRows`, keep `childComponents`, `format`, `validation` and `dispatch` the same between renders.
- Next.js App Router: ka-table uses hooks and has no 'use client', render the table in a client component.
- Theme: override the `--ka-*` custom properties on `.ka`. Dark theme: `import 'ka-table/themes/dark.css'`
  and the class `ka-dark` on the table or on an ancestor.

## Imports

| What | From |
| --- | --- |
| `Table`, `ITableProps`, `useTable`, `useTableInstance`, `useTableSelector`, `kaReducer`, the enums (`DataType`, `SortingMode`, `ActionType`...) | `ka-table` |
| `Column`, `ChildComponents`, `EditableCell`, `Group` | `ka-table/models` |
| `ICellTextProps`, `ICellEditorProps` and the other props of the parts | `ka-table/props` |
| `DispatchFunc`, `TableAction`, `FormatFunc`, `ValidationFunc` | `ka-table/types` |
| `kaPropsUtils`, `kaPagingUtils`, `kaDateUtils`, `kaColumnUtils` | `ka-table/utils` |
| the action creators (`updateData`, `selectRow`...) | `ka-table/actionCreators` |

## Where to look

- Props, columns, child components and actions: the JSDoc of the types, and the pages
  https://ka-table.com/docs_props.html, https://ka-table.com/docs_ui.html, https://ka-table.com/docs_action.html
- An example of every feature: https://github.com/komarovalexander/ka-table/tree/master/src/Demos
  (`<Name>Demo/<Name>Demo.tsx`, e.g. `RemoteDataDemo`, `CustomEditorDemo`; read `../../lib` as `ka-table`).
- Code written for 12.x: https://github.com/komarovalexander/ka-table/blob/master/MIGRATION.md
