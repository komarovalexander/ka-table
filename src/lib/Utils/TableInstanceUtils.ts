import { ITableInstance, ITableProps } from '../Components/Table/Table';

interface ITableInstanceState {
    // the props of the parent which the table has applied: a table mounted again with the same instance
    // applies the props which the parent has changed while the table was not mounted
    appliedProps?: Partial<ITableProps>;
    isRendered: boolean;
    listeners: Set<() => void>;
}

const tableInstancesState = new WeakMap<ITableInstance, ITableInstanceState>();

const getTableInstanceState = (table: ITableInstance) => {
    let state = tableInstancesState.get(table);
    if (!state) {
        state = { isRendered: false, listeners: new Set() };
        tableInstancesState.set(table, state);
    }
    return state;
};

// table.props has the state of the table only after the table is rendered
export const setTableRendered = (table: ITableInstance) => {
    getTableInstanceState(table).isRendered = true;
};

export const isTableRendered = (table: ITableInstance) => getTableInstanceState(table).isRendered;

export const getTableAppliedProps = (table: ITableInstance) => getTableInstanceState(table).appliedProps;

export const setTableAppliedProps = (table: ITableInstance, appliedProps: Partial<ITableProps>) => {
    getTableInstanceState(table).appliedProps = appliedProps;
};

export const subscribeToTable = (table: ITableInstance, listener: () => void) => {
    const { listeners } = getTableInstanceState(table);
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
};

export const notifyTableChanged = (table: ITableInstance) => {
    getTableInstanceState(table).listeners.forEach((listener) => listener());
};
