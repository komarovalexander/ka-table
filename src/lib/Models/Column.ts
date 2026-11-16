import { ColHTMLAttributes, CSSProperties } from 'react';
import { DataType, SortDirection } from '../enums';

import { Bivariant, Field } from '../types';
import { HeaderFilterItem } from './HeaderFilterItem';
import { PopupPosition } from './PopupPosition';

// the functions which get the rows are checked bivariantly: a column of the rows of a type is a column of a table
export class Column<TData = unknown> {
    /**
     * Sets attributes for col element in table colGroup
     */
    public colGroup?: ColHTMLAttributes<HTMLElement>;
    /**
     * Specifies the type of column
     */
    public dataType?: DataType;
    /**
     * Specifies the property of data's object which value will be used in column, if null value from key option will be
     * used
     */
    public field?: Field;
    /**
     * Returns filter function for particular column
     * @see {@link https://komarovalexander.github.io/ka-table/#/filter-row-custom-logic | Filter Custom Logic}
     */
    public filter?: Bivariant<(value: unknown, filterValue: unknown, rowData?: TData) => boolean>;
    /**
     * Sets filter row operator. Predefined filter operators are: `'='`, `'!='`, `'>'`, `'<'`, `'>='`, `'<='`,
     * `'contains'`, `'IsEmpty'`, `'IsNotEmpty'`
     * @see {@link https://komarovalexander.github.io/ka-table/#/filter-row-custom-editor | Filter Row Custom Editor}
     */
    public filterRowOperator?: string;
    /**
     * Sets filter row value
     * @see {@link https://komarovalexander.github.io/ka-table/#/filter-row | Filter Row}
     */
    public filterRowValue?: unknown;
    /**
     * The column sticks to the edge of the table when it is scrolled horizontally, after the other fixed columns of the
     * edge. The offsets are calculated from the numeric `width` of the fixed columns. The horizontal virtual scrolling
     * always renders the fixed columns
     * @see {@link https://komarovalexander.github.io/ka-table/#/fixed-column | Fixed Column}
     */
    public fixed?: 'left' | 'right';
    /**
     * Returns array of header filter items
     * @see {@link https://komarovalexander.github.io/ka-table/#/header-filter-logic | Header Filter - Logic}
     */
    public headerFilterListItems?: Bivariant<(props: { data?: TData[] }) => string[]>;
    /**
     * Header filter popup position
     */
    public headerFilterPopupPosition?: PopupPosition;
    /**
     * Used to customize header filter search logic, `HeaderFilterItem` is `{ value: string, isSelected: boolean }`
     * @see {@link https://komarovalexander.github.io/ka-table/#/header-filter-logic | Header Filter - Logic}
     */
    public headerFilterSearch?: (value: string, searchValue: string, rowData?: HeaderFilterItem) => boolean;
    /**
     * Stores value for search by `headerFilterValues`
     * @see {@link https://komarovalexander.github.io/ka-table/#/header-filter-logic | Header Filter - Logic}
     */
    public headerFilterSearchValue?: string;
    /**
     * Array of selected values
     */
    public headerFilterValues?: string[];
    /**
     * Specifies can a column be dragged or not
     */
    public isDraggable?: boolean;
    /**
     * Specifies can a column be editable or not
     */
    public isEditable?: boolean;
    /**
     * If `false` then header filter cell content will not be shown for a column
     */
    public isFilterable?: boolean;
    /**
     * Shows/hides header filter popup for specific column
     */
    public isHeaderFilterPopupShown?: boolean;
    /**
     * Enables search in header filter
     */
    public isHeaderFilterSearchable?: boolean;
    /**
     * Specifies can a column be resized or not
     * @see {@link https://komarovalexander.github.io/ka-table/#/column-resizing | Column Resizing}
     */
    public isResizable?: boolean;
    /**
     * Specifies can a column be sorted or not
     * @see {@link https://komarovalexander.github.io/ka-table/#/sorting | Sorting}
     */
    public isSortable?: boolean;
    /**
     * Mandatory field, specifies unique key for the column
     */
    public key!: string;
    /**
     * Sets the direction of sorting for the column
     * @see {@link https://komarovalexander.github.io/ka-table/#/sorting | Sorting}
     */
    public sortDirection?: SortDirection;
    /**
     * The priority of the column for sorting
     * @see {@link https://komarovalexander.github.io/ka-table/#/sorting | Sorting}
     */
    public sortIndex?: number;
    /**
     * Sets the style options of the elements
     */
    public style?: CSSProperties;
    /**
     * Specifies the text of the header
     */
    public title?: string;
    /**
     * Shows/Hides columns
     */
    public visible?: boolean;
    /**
     * Column width. A number (pixels) is required for `fixed` offsets and for `virtualScrolling.horizontal`
     */
    public width?: number | string;
}
