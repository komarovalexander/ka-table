[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/komarovalexander/react-table-control/blob/master/LICENSE)
[![Build Status](https://travis-ci.com/komarovalexander/react-table-control.svg?token=9QUEx9r7MWqF44f9VDer&branch=dev)](https://travis-ci.com/komarovalexander/react-table-control)

*This project is on pre-alpha stage. Stable version with documentation and finished styles will be available no later than January of 2020*

# React Table Control
The customizable, extendable, lightweight and free React Table Component

Can easily be included in react projects, never mind it is ts or js

![Table](https://komarovalexander.github.io/react-table-control/static/demos-screenshots/command-column.png)
[Demo link](https://komarovalexander.github.io/react-table-control/#/command-column)

## Installation
npm
```sh
npm install react-table-control
```
yarn
```sh
yarn add react-table-control
```

## Usage
### A basic example


```js
import React, { useState } from 'react';

import { ITableOption, Table } from 'react-table-control';
import { DataType, SortDirection, SortingMode } from 'react-table-control/enums';
import { OptionChangedFunc } from 'react-table-control/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const tableOption: ITableOption = {
  columns: [
    {
      dataType: DataType.String,
      key: 'name',
      sortDirection: SortDirection.Descend,
      style: { width: '33%' },
      title: 'Name',
    },
    { key: 'score', title: 'Score', style: { width: '10%' }, dataType: DataType.Number },
    { key: 'passed', title: 'Passed', dataType: DataType.Boolean },
  ],
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const SortingDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChanged: OptionChangedFunc = (value) => {
    changeOptions({...option, ...value });
  };
  return (
    <Table
      {...option}
      data={dataArray}
      onOptionChanged={onOptionChanged}
    />
  );
};

export default SortingDemo;
```

[Demo link](https://komarovalexander.github.io/react-table-control/#/sorting)

## API
<a name="Table"></a>
### Table
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| columns | [<code>Column\[\]</code>](#Column) | Columns in table and their look and behaviour |
| data | <code>any\[\]</code> | The data which is shown in Table's rows |
| editableCells | [<code>Cell[]</code>](#Cell) | This property contains the array of cells which are being edited |
| editingMode | [<code>EditingMode</code>](#EditingMode) | Sets the table's editing mode |
| filterRow | [<code>FilterCondition[]</code>](#FilterCondition) | Sets filters for columns |
| groups | [<code>Group[]</code>](#Group) | Group's in the table |
| groupsExpanded | TODO | Contains groups which are expanded in the grid |
| rowKey | string | Property of data's item which is used to identitify row |
| sortingMode | [<code>SortingMode[]</code>](#SortingMode)  | Sorting mode |
| search <a name="Table.search"></a> | string | Specifies the text which should be found in the data |


<a name="Column"></a>
### Column
Describes column of table its look and behaviour
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| field | string | Specifies the property of data's object which value will be used in column |
| title | string | Specifies the text of the header |
| dataType | [<code>DataType</code>](#DataType) | Specifies the type of column |
| sortDirection | [<code>SortDirection</code>](#SortDirection) | Sets the direction of sorting for the column |
| editor | [<code>EditorFunc</code>](#EditorFunc) | Returns an editor if cell is in editable mode |
| cell | [<code>CellFunc</code>](#CellFunc) | Returns an custom cell if it is not in editable mode |
| width | <code>number \| string</code> | Sets the width of the column |
| textAlign | [<code>TextAlign</code>](#TextAlign) | Sets column's text alignment |
| search | [<code>SearchFunc</code>](#SearchFunc) | Overrides the default search method for the cell. Executes if [Table.search](#Table.search) option is set |
| validation | [<code>ValidationFunc</code>](#ValidationFunc) | Returns the validation error string or does not return anything in case of passed validation |



<a name="Cell"></a>
### Cell
Describes the position of a cell in  the table

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| field | string | The field of
specific column |
| rowKeyValue | any | Data's key value of еру specific row |


<a name="FilterCondition"></a>
### FilterCondition

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| field | string | The filtered column's field |
| operator | string | Operator which will be applied for filtering |
| value | any | Filtered value |


<a name="Group"></a>
### Group

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| field | string | The grouped column's field |


<a name="DataType"></a>
### DataType

| Property | String value |
| --- | --- |
| Boolean | 'boolean' |
| Date | 'date' |
| Number | 'number' |
| Object | 'object' |
| String | 'string' |


<a name="EditingMode"></a>
### EditingMode

| Property | String value | Description |
| --- | --- | --- |
| None | 'none' | Editing is disabled |
| Cell | 'cell' | Data is edited by cell to cell, click by cell activates editing |


<a name="SortDirection"></a>
### SortDirection

| Property | String value |
| --- | --- |
| Ascend | 'ascend' |
| Descend | 'descend' |


<a name="SortingMode"></a>
### SortingMode

| Property | String value |
| --- | --- |
| None | 'none' |
| Single | 'single' |


<a name="TextAlign"></a>
### TextAlign

| Property | String value |
| --- | --- |
| Center | 'center' |
| Left | 'left' |
| Right | 'right' |


<a name="EditorFunc"></a>
### EditorFunc

(props: [<code>ICellEditorProps</code>](#ICellEditorProps)) => any;

Function which obtains [<code>ICellEditorProps</code>](#ICellEditorProps) as parameter and returns React component which should be shown instead of default editor.


<a name="CellFunc"></a>
### CellFunc

(props: [<code>ICellContentProps</code>](#ICellContentProps)) => any;

Function which obtains [<code>ICellContentProps</code>](#ICellContentProps) as parameter and returns React component which should be shown instead of cell content.


<a name="SearchFunc"></a>
### SearchFunc

(searchText?: string, rowData?: any, column?: Column) => boolean;

Function which obtains searchText?: string, rowData?: any, column?: Column - as parameters and returns boolean value which is true if cell's value is matched with searched value and false otherwise.


<a name="ValidationFunc"></a>
### ValidationFunc

(value: any, rowData: any) => string | void;

Function which obtains value of specific cell and row - as parameters and returns validation error string or does not return anything in case of passed validation.


<a name="ICellEditorProps"></a>
### ICellEditorProps
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| column | [<code>Column</code>](#Column) | settings of the column in which editor is shown |
| rowData | any | data of the row in which editor is shown |
| close | () => void | call this method to close editor |
| onValueChange | (newValue: any) => void | call this method to change value of the row: <code>onValueChange({ ...rowData, ...{ [field]: value } })</code> |


<a name="ICellContentProps"></a>
### ICellEditorProps
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| column | [<code>Column</code>](#Column) | settings of the column in which editor is shown |
| openEditor | () => void | call this method to open editor of the cell |
| rowData | any | data of the row in which editor is shown |