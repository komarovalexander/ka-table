import { DataType, SortDirection } from '../enums';

import { Bivariant, Field } from '../types';
import { HeaderFilterItem } from './HeaderFilterItem';
import { PopupPosition } from './PopupPosition';

// the functions which get the rows are checked bivariantly: a column of the rows of a type is a column of a table
export class Column<TData = unknown> {
    public colGroup?: React.ColHTMLAttributes<HTMLElement>;
    public dataType?: DataType;
    public field?: Field;
    public filter?: Bivariant<(value: unknown, filterValue: unknown, rowData?: TData) => boolean>;
    public filterRowOperator?: string;
    public filterRowValue?: unknown;
    // the cells of the column stick to the left or the right edge when the table is scrolled horizontally, after the other
    // fixed columns of the edge (the offsets are the numeric widths of these columns); the virtual scrolling always renders them
    public fixed?: 'left' | 'right';
    public headerFilterListItems?: Bivariant<(props: { data?: TData[] }) => string[]>;
    public headerFilterPopupPosition?: PopupPosition;
    public headerFilterSearch?: (value: string, searchValue: string, rowData?: HeaderFilterItem) => boolean;
    public headerFilterSearchValue?: string;
    public headerFilterValues?: string[];
    public isDraggable?: boolean;
    public isEditable?: boolean;
    public isFilterable?: boolean;
    public isHeaderFilterPopupShown?: boolean;
    public isHeaderFilterSearchable?: boolean;
    public isResizable?: boolean;
    public isSortable?: boolean;
    public key!: string;
    public sortDirection?: SortDirection;
    public sortIndex?: number;
    public style?: React.CSSProperties;
    public title?: string;
    public visible?: boolean;
    public width?: number | string;
}
