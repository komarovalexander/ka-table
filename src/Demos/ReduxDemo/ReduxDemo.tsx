import { DataType, EditingMode, SortingMode } from '../../lib/enums';
import { ITableProps, Table, kaReducer } from '../../lib';
import { CustomAction, TableAction } from '../../lib/types';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { StoreEnhancer, combineReducers, createStore } from 'redux';

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
    tablePropsInit: (state: ITableProps = initialTableOption, action: TableAction | CustomAction) => kaReducer(state, action)
});
type State = ReturnType<typeof combinedReducer>;

// the extension of the browser which shows the actions and the states
const devTools = (window as Window & { __REDUX_DEVTOOLS_EXTENSION__?: () => StoreEnhancer }).__REDUX_DEVTOOLS_EXTENSION__;
const store = createStore(
    combinedReducer,
    devTools?.(),
);

const ReduxTableComponent = () => {
    const tablePropsInit = useSelector((state: State) => state.tablePropsInit);
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
