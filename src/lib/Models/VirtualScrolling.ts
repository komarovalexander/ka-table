import { Bivariant } from '../types';

export class VirtualScrolling {
    /**
     * Enables virtual scrolling: only the visible rows are rendered. `false` shows all the rows
     */
    public enabled?: boolean;
    /**
     * The columns are virtualized too: only the visible columns are rendered, and the fixed ones and the ones without a
     * numeric `width`; spacers keep the width of the table. Is not applied with `groupedColumns`
     * @see {@link https://komarovalexander.github.io/ka-table/#/many-columns | Many Columns}
     */
    public horizontal?: boolean;
    /**
     * Horizontal: scroll left position at the last change of the rendered columns (the state of the table)
     */
    public scrollLeft?: number;
    /**
     * Current scroll top position (the state of the table)
     */
    public scrollTop?: number;
    /**
     * The height of the rows, or a function which returns the height of a row of the shown data: a row of the data, a
     * group row, a tree row...
     */
    public itemHeight?: Bivariant<(data: unknown) => number> | number;
    /**
     * Tbody height
     */
    public tbodyHeight?: number;
    /**
     * Amount of rows which should be rendered under visible area
     */
    public bottomInvisibleCount?: number;
    /**
     * Amount of rows which should be rendered over visible area (useful for scrolling - in that case some items will be
     * already visible and it will be more smooth)
     */
    public topInvisibleCount?: number;
    /**
     * Horizontal: the width of the visible part of the table, measured when it is not set
     */
    public tableWidth?: number;
    /**
     * Horizontal: amount of columns rendered before the visible ones (2 by default)
     */
    public leftInvisibleCount?: number;
    /**
     * Horizontal: amount of columns rendered after the visible ones (2 by default)
     */
    public rightInvisibleCount?: number;
}
