import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { ITableProps, Table, kaReducer } from 'ka-table';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import React from 'react';

const dataArray = Array(30).fill(undefined).map(
    (_, index) => ({
        column1: `column:1 row:${index}`,
        column2: `column:2 row:${index}`,
        column3: `column:3 row:${index}`,
        column4: `column:4 row:${index}`,
        id: index,
    }),
);

const initialTableOption: ITableProps = {
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

const combinedReducer = combineReducers({
    tablePropsInit: (state = initialTableOption, action) => kaReducer(state, action)
});
const store = createStore(
    combinedReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

const ReduxTableComponent = () => {
    const tablePropsInit = useSelector((state: any) => state.tablePropsInit);
    const dispatch = useDispatch();
    return (
        <Table
            {...tablePropsInit}
            dispatch={dispatch}
        />
    );
};

const ReduxDemo = () => {
    return (
        <Provider store={store}>
            <ReduxTableComponent />
        </Provider>
    );
};

export default ReduxDemo;
