import { getControlledPropsKeys, getPropsToOverride } from './utils';

import { ITableProps } from '../Table/Table';

describe('TableUncontrolled', () => {
    it('getControlledPropsKeys', () => {
        expect(getControlledPropsKeys({
            loading: { enabled: false }
        } as ITableProps)).toEqual(['searchText', 'loading', 'data', 'paging']);

        expect(getControlledPropsKeys({
            loading: { enabled: true }
        } as ITableProps)).toEqual(['searchText', 'loading']);

        expect(getControlledPropsKeys({
            loading: { enabled: true },
            controlledPropsKeys: ['height'],
        } as ITableProps)).toEqual(['height']);
    });

    it('getPropsToOverride', () => {
        const loading1 = { enabled: false };
        expect(getPropsToOverride(['searchText', 'loading', 'data', 'paging', 'selectedRows'], {
            loading: loading1
        } as ITableProps, {
            loading: loading1
        } as ITableProps)).toEqual({});

        expect(getPropsToOverride(['loading', 'data'], {
            loading: loading1,
            data: [{ key: 1 }],
        } as ITableProps, {
            loading: loading1
        } as ITableProps)).toEqual({ data: [{ key: 1 }] });

        expect(getPropsToOverride(['loading'], {
            loading: loading1,
            data: [{ key: 1 }],
        } as ITableProps, {
            loading: loading1
        } as ITableProps)).toEqual({});

        expect(getPropsToOverride(['loading'], {
            loading: loading1,
        } as ITableProps, {
            loading: loading1,
            data: [{ key: 1 }],
        } as ITableProps)).not.toHaveProperty('data');

        expect(getPropsToOverride(['loading', 'data'], {
            loading: loading1,
        } as ITableProps, {
            loading: loading1,
            data: [{ key: 1 }],
        } as ITableProps)).toHaveProperty('data');
    });

});
