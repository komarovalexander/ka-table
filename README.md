The customizable, extendable, lightweight (~25kb gzipped), and fully free React Table Component

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/komarovalexander/ka-table/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/ka-table.svg?style=flat-square)](https://www.npmjs.com/package/ka-table)
[![Coverage Status](https://coveralls.io/repos/github/komarovalexander/ka-table/badge.svg?branch=master&service=github)](https://coveralls.io/github/komarovalexander/ka-table?branch=master&service=github)
[![Build Status](https://travis-ci.com/komarovalexander/ka-table.svg?token=9QUEx9r7MWqF44f9VDer&branch=master)](https://travis-ci.com/komarovalexander/ka-table)

<a href="http://ka-table.com"><img src="http://ka-table.com/images/logo.svg"/></a>

[Site](http://ka-table.com) | [Demos](https://komarovalexander.github.io/ka-table/#/overview) | [Docs](http://ka-table.com/docs_get_started.html)

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
