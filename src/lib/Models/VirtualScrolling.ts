import { Bivariant } from '../types';

export class VirtualScrolling {
    public enabled?: boolean;
    public scrollTop?: number;
    // the height of a row of the shown data: a row of the data, a group row, a tree row...
    public itemHeight?: Bivariant<(data: unknown) => number> | number;
    public tbodyHeight?: number;
    public bottomInvisibleCount?: number;
    public topInvisibleCount?: number;
}
