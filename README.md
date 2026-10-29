The customizable, extendable, lightweight, and fully free React Table Component

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/komarovalexander/ka-table/blob/master/LICENSE)
[![CI](https://github.com/komarovalexander/ka-table/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/komarovalexander/ka-table/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/ka-table.svg?style=flat-square)](https://www.npmjs.com/package/ka-table)
[![Coverage Status](https://coveralls.io/repos/github/komarovalexander/ka-table/badge.svg?branch=master&service=github)](https://coveralls.io/github/komarovalexander/ka-table?branch=master&service=github)

<a href="http://ka-table.com"><img src="http://ka-table.com/images/logo.svg"/></a>

[Site](http://ka-table.com) | [Demos](https://komarovalexander.github.io/ka-table/#/overview) | [Docs](http://ka-table.com/docs_get_started.html) | [Changelog](https://github.com/komarovalexander/ka-table/blob/master/CHANGELOG.md)

Upgrading from 12.x? See the [migration guide](https://github.com/komarovalexander/ka-table/blob/master/MIGRATION.md).

![Table](https://komarovalexander.github.io/ka-table/static/demos-screenshots/delete-row.png)
[Demo link](https://komarovalexander.github.io/ka-table/#/delete-row)

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
import 'ka-table/style.css';

import React from 'react';

import { Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';

const dataArray = Array(10)
  .fill(undefined)
  .map((_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }));

const OverviewDemo = () => {
  return (
    <Table
      columns={[
        { key: 'column1', title: 'Column 1', dataType: DataType.String },
        { key: 'column2', title: 'Column 2', dataType: DataType.String },
        { key: 'column3', title: 'Column 3', dataType: DataType.String },
        { key: 'column4', title: 'Column 4', dataType: DataType.String },
      ]}
      data={dataArray}
      editingMode={EditingMode.Cell}
      rowKeyField={'id'}
      sortingMode={SortingMode.Single}
    />
  );
};

export default OverviewDemo;
```

[Example link](https://komarovalexander.github.io/ka-table/#/overview)

## Theming

`ka-table/style.css` is plain CSS: every colour and size of the default theme is a CSS custom property declared on the root element of the table (`.ka`), so a theme is a rule which overrides the properties you need — for every table or for the tables inside a container:

```css
/* a dark theme for every table */
.ka {
  --ka-background-color: #2c2c2c;
  --ka-border-color: #4d4d4d;
  --ka-color-base: #fefefe;
  --ka-thead-background-color: #1b1b1b;
  --ka-thead-color: #c5c5c5;
  --ka-selected-background-color: #3c3c3c;
  --ka-row-hover-background-color: rgba(255, 255, 255, 0.1);
}

/* or only for the tables inside .my-wrapper */
.my-wrapper .ka {
  --ka-thead-background-color: #1b1b1b;
}
```

The rule has to match `.ka` itself: a property set only on an ancestor (`:root { ... }`, `html[data-theme="dark"] { ... }`) is overridden by the defaults of the table.

[Custom theme demo](https://komarovalexander.github.io/ka-table/#/custom-theme)

### Dark theme

`ka-table/themes/dark.css` is such a rule for the class `ka-dark`: add the class to an ancestor of the table (e.g. `<body class="ka-dark">`) or to the table itself (`childComponents.rootDiv`). It also sets `color-scheme: dark`, so the native inputs of the editors and the filters are dark too.

```js
import 'ka-table/style.css';
import 'ka-table/themes/dark.css';
```

```tsx
<div className='ka-dark'>
  <Table {...tableProps} />
</div>
```

[Dark theme demo](https://komarovalexander.github.io/ka-table/#/dark-theme)

| Property | Default | Used for |
| --- | --- | --- |
| `--ka-background-color` | `white` | background of the table |
| `--ka-border-color` | `#F3F6F9` | borders of the rows, `.ka-even` rows, border of the popup |
| `--ka-color-base` | `#353C44` | text |
| `--ka-font-size` | `14px` | font size of the table |
| `--ka-thead-background-color` | `#F1F5F7` | background of the header |
| `--ka-thead-color` | `#646D76` | text of the header |
| `--ka-thead-cell-padding` | `15px 20px` | padding of the header cells |
| `--ka-header-cell-height` | `47px` | height of a header row (the sticky offsets are calculated from it) |
| `--ka-sort-icon-color` | `#586068` | arrows of the sorting |
| `--ka-header-filter-button-icon-color` | `#41474D` | icon of the header filter |
| `--ka-column-resize-border-color` | `#D7E4EB` | handle of the column resizing |
| `--ka-cell-color` | `var(--ka-color-base)` | text of the cells |
| `--ka-cell-padding` | `8px 20px` | padding of the cells |
| `--ka-cell-line-height` | `29px` | line height of the cells |
| `--ka-cell-hover-background-color` | `transparent` | overlay of the hovered cell |
| `--ka-row-border-size` | `2px` | width of the borders of the rows |
| `--ka-row-hover-background-color` | `transparent` | overlay of the hovered row |
| `--ka-selected-background-color` | `#F7FcFd` | selected rows |
| `--ka-selected-border-color` | `#E1EBF0` | drop target of the drag and drop |
| `--ka-fixed-column-shadow-color` | `rgba(0, 0, 0, 0.12)` | shadow of the fixed columns (`column.fixed`) over the columns scrolled under them |
| `--ka-group-row-background-color` | `#F9FBFC` | background of the group rows |
| `--ka-group-row-border-color` | `white` | borders of the group rows |
| `--ka-group-row-border-size` | `1px` | width of the borders of the group rows |
| `--ka-group-cell-padding` | `8px 10px` | padding of the group cells |
| `--ka-group-panel-text-color` | `#747D86` | text of the empty group panel |
| `--ka-group-panel-cell-remove-color` | `#A6ADB4` | remove icon of the group panel |
| `--ka-input-background-color` | `white` | background of the editors and the filter inputs |
| `--ka-input-border-color` | `#747D86` | border of the editors and the filter inputs |
| `--ka-input-color` | `currentColor` | text of the editors and the filter inputs |
| `--ka-input-validation-background-color` | `#FFE7E7` | background of an invalid editor |
| `--ka-validation-background-color` | `#FF0C0C` | background of the validation message, border of an invalid editor |
| `--ka-validation-color` | `white` | text of the validation message |
| `--ka-validation-message-font-size` | `12px` | font size of the validation message |
| `--ka-validation-message-padding` | `0 10px` | padding of the validation message |
| `--ka-filter-row-cell-padding` | `0 20px 15px 20px` | padding of the filter row cells |
| `--ka-summary-cell-padding` | `12px 20px` | padding of the summary cells |
| `--ka-icon-font-size` | `10px` | font size of the icons |
| `--ka-loading-backdrop-color` | `#ffffff88` | backdrop of the loading |
| `--ka-loading-background-color-base` | `rgb(116, 125, 134)` | dots of the loading |
| `--ka-loading-background-color-medium` | `rgba(116, 125, 134, 0.4)` | dots of the loading (animation) |
| `--ka-loading-background-color-light` | `rgba(116, 125, 134, 0.2)` | dots of the loading (animation) |
| `--ka-paging-index-color` | `var(--ka-thead-color)` | page numbers |
| `--ka-paging-index-active-background-color` | `#F1F5F7` | background of the active page |
| `--ka-paging-index-active-color` | `#747D86` | text of the active page |
| `--ka-paging-pages-margin` | `0` | margin of the paging |
| `--ka-paging-pages-padding` | `0 10px` | padding of the paging |
| `--ka-popup-background-color` | `white` | background of the header filter popup |
| `--ka-popup-color` | `#747D86` | text of the header filter popup |
| `--ka-popup-box-shadow` | `0 6px 12px rgba(0, 0, 0, 0.18)` | shadow of the header filter popup |

The hover colours are painted as an overlay above the background of the row and the cell, so a translucent colour blends with the zebra and the selection colours. The themes written for the Sass variables of 12.x are described in the [migration guide](https://github.com/komarovalexander/ka-table/blob/master/MIGRATION.md#6-the-theme-is-plain-css-with-custom-properties).
