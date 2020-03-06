import React from 'react';
import { connect, ConnectedProps, Provider } from 'react-redux';
import { createStore } from 'redux';

import { ITableOption, Table } from '../../lib';
import { DataType, EditingMode, SortingMode } from '../../lib/enums';
import { kaReducer } from '../../lib/reducers';

const dataArray = Array(30).fill(undefined).map(
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

const store = createStore(
  kaReducer,
  tableOption,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);
const mapState = (state: ITableOption) => ({
  tableState: state,
});

const mapDispatch = {
  dispatch: (action: any) => action,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ReduxTableComponent = (props: PropsFromRedux) => {
  return (
    <Table
      {...props.tableState}
      dispatch={props.dispatch}
    />
  );
};
const ReduxComponent = connector(ReduxTableComponent);

const ReduxDemo = () => {
  return (
    <Provider store={store}>
      <ReduxComponent />
    </Provider>
  );
};


export default ReduxDemo;
