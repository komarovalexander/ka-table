import { EditingMode, SortDirection } from '../../enums';
import { getCallbackProps, getControlledPropsKeys, getPropsToOverride, withCallbacks } from './utils';

import { ITableProps } from '../Table/Table';

describe('TableUncontrolled', () => {
    describe('getControlledPropsKeys', () => {
        const props: ITableProps = {
            columns: [],
            data: [],
            rowKeyField: 'id',
            editingMode: EditingMode.Cell,
            format: () => '',
            loading: { enabled: false },
        };
        it('all the props except the functions', () => {
            expect(getControlledPropsKeys(props)).toEqual(['columns', 'data', 'rowKeyField', 'editingMode', 'loading']);
        });
        it('applies data, columns, paging and selectedRows when the loading ends', () => {
            expect(getControlledPropsKeys({ ...props, loading: { enabled: true }, paging: {}, selectedRows: [] }))
                .toEqual(['rowKeyField', 'editingMode', 'loading']);
        });
        it('the props which the parent does not pass anymore', () => {
            expect(getControlledPropsKeys(props, { height: 100 })).toEqual(['height', 'columns', 'data', 'rowKeyField', 'editingMode', 'loading']);
        });
        it('controlledPropsKeys sets the keys', () => {
            expect(getControlledPropsKeys({ ...props, controlledPropsKeys: ['height'] })).toEqual(['height']);
        });
    });
    it('getCallbackProps', () => {
        const format = () => '';
        const callbacks = getCallbackProps({ columns: [], rowKeyField: 'id', format, search: undefined });
        expect(Object.keys(callbacks)).toEqual(['format']);
        expect(callbacks.format).toBe(format);
    });
    it('withCallbacks removes the functions which the parent does not pass anymore', () => {
        const format = () => '';
        const state: ITableProps = { columns: [], rowKeyField: 'id', format: () => 'old', search: () => true };
        expect(withCallbacks(state, { format })).toEqual({ columns: [], rowKeyField: 'id', format });
    });

    describe('getPropsToOverride', () => {
        const loading1 = { enabled: false };
        it('returns the props changed since the previous props', () => {
            expect(getPropsToOverride(['searchText', 'loading', 'data', 'paging'], {
                loading: loading1
            } as ITableProps, {
                loading: loading1
            }, {
                loading: loading1
            } as ITableProps)).toEqual({});

            expect(getPropsToOverride(['loading', 'data'], {
                loading: loading1,
                data: [{ key: 1 }],
            } as ITableProps, {
                loading: loading1
            }, {
                loading: loading1
            } as ITableProps)).toEqual({ data: [{ key: 1 }] });

            expect(getPropsToOverride(['loading'], {
                loading: loading1,
                data: [{ key: 1 }],
            } as ITableProps, {
                loading: loading1
            }, {
                loading: loading1
            } as ITableProps)).toEqual({});

            expect(getPropsToOverride(['loading'], {
                loading: loading1,
            } as ITableProps, {
                loading: loading1,
                data: [{ key: 1 }],
            }, {
                loading: loading1,
                data: [{ key: 1 }],
            } as ITableProps)).not.toHaveProperty('data');

            expect(getPropsToOverride(['loading', 'data'], {
                loading: loading1,
            } as ITableProps, {
                loading: loading1,
                data: [{ key: 1 }],
            }, {
                loading: loading1,
                data: [{ key: 1 }],
            } as ITableProps)).toHaveProperty('data');
        });
        it('ignores props which are created again with the same values', () => {
            const tableProps = {
                columns: [{ key: 'a', sortDirection: SortDirection.Ascend }],
                data: [{ id: 1 }],
                paging: { enabled: true, pageIndex: 3 },
                rowKeyField: 'id',
            } as ITableProps;
            expect(getPropsToOverride(['columns', 'data', 'paging'], {
                columns: [{ key: 'a' }],
                data: [{ id: 1 }],
                paging: { enabled: true },
            } as ITableProps, {
                columns: [{ key: 'a' }],
                data: [{ id: 1 }],
                paging: { enabled: true },
            }, tableProps)).toEqual({});
        });
        it('applies only the changed fields of a column and keeps its state', () => {
            expect(getPropsToOverride(['columns'], {
                columns: [{ key: 'a', visible: false }, { key: 'b', title: 'B' }],
            } as ITableProps, {
                columns: [{ key: 'a' }, { key: 'b', title: 'B' }],
            }, {
                columns: [{ key: 'b', title: 'B', width: 50 }, { key: 'a', sortDirection: SortDirection.Ascend }],
            } as ITableProps)).toEqual({
                columns: [{ key: 'b', title: 'B', width: 50 }, { key: 'a', sortDirection: SortDirection.Ascend, visible: false }],
            });
        });
        it('takes the new list of columns and keeps the state of the remaining ones', () => {
            expect(getPropsToOverride(['columns'], {
                columns: [{ key: 'c' }, { key: 'a' }],
            } as ITableProps, {
                columns: [{ key: 'a' }, { key: 'b' }],
            }, {
                columns: [{ key: 'a', sortDirection: SortDirection.Ascend }, { key: 'b' }],
            } as ITableProps)).toEqual({
                columns: [{ key: 'c' }, { key: 'a', sortDirection: SortDirection.Ascend }],
            });
        });
        it('takes new functions of columns', () => {
            const filter = () => true;
            const result = getPropsToOverride(['columns'], {
                columns: [{ key: 'a', filter }],
                rowKeyField: 'id',
            } as ITableProps, {
                columns: [{ key: 'a', filter: () => false }],
            }, {
                columns: [{ key: 'a', filter: () => false, sortDirection: SortDirection.Ascend }],
                rowKeyField: 'id',
            } as ITableProps);
            expect(result.columns![0].filter).toBe(filter);
            expect(result.columns![0].sortDirection).toBe(SortDirection.Ascend);
        });
        it('applies only the changed fields of an object', () => {
            expect(getPropsToOverride(['paging'], {
                paging: { enabled: true, pageSize: 20 },
            } as ITableProps, {
                paging: { enabled: true, pageSize: 10 },
            }, {
                paging: { enabled: true, pageIndex: 3, pageSize: 10 },
            } as ITableProps)).toEqual({
                paging: { enabled: true, pageIndex: 3, pageSize: 20 },
            });
        });
    });

});
