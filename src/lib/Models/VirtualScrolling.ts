import { Bivariant } from '../types';

export class VirtualScrolling {
    public enabled?: boolean;
    // the columns are virtualized too: the visible columns are rendered, and the fixed ones and the ones without a numeric width
    public horizontal?: boolean;
    public scrollLeft?: number;
    public scrollTop?: number;
    // the height of a row of the shown data: a row of the data, a group row, a tree row...
    public itemHeight?: Bivariant<(data: unknown) => number> | number;
    public tbodyHeight?: number;
    public bottomInvisibleCount?: number;
    public topInvisibleCount?: number;
    // horizontal: the width of the visible part of the table (measured when it is not set) and the columns rendered around it
    public tableWidth?: number;
    public leftInvisibleCount?: number;
    public rightInvisibleCount?: number;
}
