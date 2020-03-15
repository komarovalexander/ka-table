[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/komarovalexander/ka-table/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/ka-table.svg?style=flat-square)](https://www.npmjs.com/package/ka-table)
[![Coverage Status](https://coveralls.io/repos/github/komarovalexander/ka-table/badge.svg?branch=master&service=github)](https://coveralls.io/github/komarovalexander/ka-table?branch=master&service=github)
[![Build Status](https://travis-ci.com/komarovalexander/ka-table.svg?token=9QUEx9r7MWqF44f9VDer&branch=master)](https://travis-ci.com/komarovalexander/ka-table)

# Overview
The customizable, extendable, lightweight and free React Table Component

![Table](https://komarovalexander.github.io/ka-table/static/demos-screenshots/command-column.png)
[Demo link](https://komarovalexander.github.io/ka-table/#/command-column)

## Installation
npm
```sh
npm install ka-table
```
yarn
```sh
yarn add ka-table
```

## Usage
### Basic example


```js
import React, { useState } from 'react';

import { ITableOption, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { kaReducer } from 'ka-table/reducers';
import { DispatchFunc } from 'ka-table/types';

const dataArray = Array(10).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const tableOption: ITableOption = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const OverviewDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const dispatch: DispatchFunc = (action) => {
    changeOptions((prevState: ITableOption) => kaReducer(prevState, action));
  };

  return (
    <Table
      {...option}
      dispatch={dispatch}
    />
  );
};

export default OverviewDemo;
```

[Example link](https://komarovalexander.github.io/ka-table/#/overview)

## Examples

[Overview](https://komarovalexander.github.io/ka-table/#/overview) - combination of main features in one demo

[Command Column](https://komarovalexander.github.io/ka-table/#/command-column) - Functional columns which are not bound to data and used to add custom command to table

[Custom Cell](https://komarovalexander.github.io/ka-table/#/custom-cell) - Best way to customise look of every column in table

[Custom DataRow](https://komarovalexander.github.io/ka-table/#/custom-data-row) - Customise look of a row in the table

[Custom Editor](https://komarovalexander.github.io/ka-table/#/custom-editor) - Table supports user created editors

[Custom Header Cell](https://komarovalexander.github.io/ka-table/#/custom-header-cell) - Customisation of header cell

[Editing](https://komarovalexander.github.io/ka-table/#/editing) - Editing out of the box

[Events](https://komarovalexander.github.io/ka-table/#/events) - All events are trackable

[Filter Extended](https://komarovalexander.github.io/ka-table/#/filter-extended) - Easy filtered by extended filters

[Filter Row](https://komarovalexander.github.io/ka-table/#/filter-row) - Built-in filter row

[Filter Row - Custom Editor](https://komarovalexander.github.io/ka-table/#/filter-row-custom-editor) - Customise filter cell every way you want

[Grouping](https://komarovalexander.github.io/ka-table/#/grouping) - Group data for most convenient work with it

[Grouping Custom Cell](https://komarovalexander.github.io/ka-table/#/grouping-custom-cell) - Customize group cell

[Grouping Custom Row](https://komarovalexander.github.io/ka-table/#/grouping-custom-row) - Customize group row

[Hover Row](https://komarovalexander.github.io/ka-table/#/hover-row) - Get row data by hover

[Many Columns](https://komarovalexander.github.io/ka-table/#/many-columns) - Grid works fine with big amount of columns

[25000 Rows](https://komarovalexander.github.io/ka-table/#/many-rows) - Virtualisation are supported

[10000 Grouped Rows](https://komarovalexander.github.io/ka-table/#/many-rows-grouping) - Virtualisation work well with grouping

[Search](https://komarovalexander.github.io/ka-table/#/search) - Search by the whole Table is easy

[Selection - Multiple](https://komarovalexander.github.io/ka-table/#/selection) - Select multiple row clickeng by checkboxes

[Selection - Single](https://komarovalexander.github.io/ka-table/#/selection) - Single row selection by click

[Sorting](https://komarovalexander.github.io/ka-table/#/sorting) - Sorting by specific column

[State Storing](https://komarovalexander.github.io/ka-table/#/state-storing) - Save Table's state and restore it after page reload

[Validation](https://komarovalexander.github.io/ka-table/#/validation) - Validate editor value before apply it

