import { getControlledPropsKeys, getPropsToOverride } from './utils';

import { ITableProps } from '../Table/Table';
import { SortDirection } from '../../enums';

describe('TableUncontrolled', () => {
    it('getControlledPropsKeys', () => {
        expect(getControlledPropsKeys({
            loading: { enabled: false }
        } as ITableProps)).toEqual(['searchText', 'loading', 'data', 'columns', 'paging', 'selectedRows']);

        expect(getControlledPropsKeys({
            loading: { enabled: true }
        } as ITableProps)).toEqual(['searchText', 'loading']);

        expect(getControlledPropsKeys({
            loading: { enabled: true },
            controlledPropsKeys: ['height'],
        } as ITableProps)).toEqual(['height']);
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
