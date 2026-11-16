import {
    ICellEditorProps,
    ICellProps,
    ICellTextProps,
    IDataRowProps,
    IEmptyCellProps,
    IFilterRowEditorProps,
    IGroupPanelCellProps,
    IGroupPanelProps,
    IGroupRowProps,
    IGroupSummaryCellProps,
    IGroupSummaryRowProps,
    IHeadCellProps,
    IHeadCellResizeProps,
    IHeadRowProps,
    IHeaderFilterButtonProps,
    ILoadingProps,
    INoDataRowProps,
    IPagingIndexProps,
    IPagingProps,
    IPagingSizeProps,
    IPopupContentProps,
    ISortIconProps,
    ISummaryCellProps,
    ISummaryRowProps,
    ITableBodyProps,
    ITableFootProps,
    ITableHeadProps,
} from '../props';

import { ChildComponent } from './ChildComponent';
import { HeaderFilterItem } from './HeaderFilterItem';
import { ITableProps } from '../';

export class ChildComponents<TData = unknown> {
    /**
     * @element td
     */
    public cell?: ChildComponent<ICellProps<TData>>;
    /**
     * @element div
     * @see {@link https://komarovalexander.github.io/ka-table/#/custom-editor | Custom Editor}
     */
    public cellEditor?: ChildComponent<ICellEditorProps<TData>>;
    /**
     * @element input
     * @see {@link https://komarovalexander.github.io/ka-table/#/keyboard-navigation | Keyboard Navigation}
     */
    public cellEditorInput?: ChildComponent<ICellEditorProps<TData>>;
    /**
     * @element div
     * @see {@link https://komarovalexander.github.io/ka-table/#/custom-cell | Custom Cell}
     */
    public cellText?: ChildComponent<ICellTextProps<TData>>;
    /**
     * @element tr
     * @see {@link https://komarovalexander.github.io/ka-table/#/custom-data-row | Custom Row}
     */
    public dataRow?: ChildComponent<IDataRowProps<TData>>;
    /**
     * @element td
     * @see {@link https://komarovalexander.github.io/ka-table/#/details-row | Details Row}
     */
    public detailsCell?: ChildComponent<IDataRowProps<TData>>;
    /**
     * @element tr
     * @see {@link https://komarovalexander.github.io/ka-table/#/details-row | Details Row}
     */
    public detailsRow?: ChildComponent<IDataRowProps<TData>>;
    /**
     * @element td
     */
    public emptyCell?: ChildComponent<IEmptyCellProps>;
    /**
     * @element td
     * @see {@link https://komarovalexander.github.io/ka-table/#/filter-row-custom-editor | Filter Row - Custom Editor}
     */
    public filterRowCell?: ChildComponent<IFilterRowEditorProps>;
    /**
     * @element input
     */
    public filterRowCellInput?: ChildComponent<IFilterRowEditorProps>;
    /**
     * @element td
     * @see {@link https://komarovalexander.github.io/ka-table/#/grouping-custom-cell | Grouping Custom Cell}
     */
    public groupCell?: ChildComponent<IGroupRowProps<TData>>;
    /**
     * @element div
     */
    public groupExpandButton?: ChildComponent<IGroupRowProps<TData>>;
    /**
     * @element div
     * @see {@link https://komarovalexander.github.io/ka-table/#/grouping | Grouping}
     */
    public groupPanel?: ChildComponent<IGroupPanelProps>;
    /**
     * @element div
     * @see {@link https://komarovalexander.github.io/ka-table/#/grouping | Grouping}
     */
    public groupPanelCell?: ChildComponent<IGroupPanelCellProps>;
    /**
     * @element tr
     * @see {@link https://komarovalexander.github.io/ka-table/#/grouping-custom-row | Grouping Custom Row}
     */
    public groupRow?: ChildComponent<IGroupRowProps<TData>>;
    /**
     * @element td
     * @see {@link https://komarovalexander.github.io/ka-table/#/grouping-summary | Grouping Summary}
     */
    public groupSummaryCell?: ChildComponent<IGroupSummaryCellProps<TData>>;
    /**
     * @element tr
     */
    public groupSummaryRow?: ChildComponent<IGroupSummaryRowProps<TData>>;
    /**
     * @element th
     * @see {@link https://komarovalexander.github.io/ka-table/#/custom-header-cell | Custom Header Cell}
     */
    public headCell?: ChildComponent<IHeadCellProps>;
    /**
     * @element div
     * @see {@link https://komarovalexander.github.io/ka-table/#/column-reordering | Column Reordering}
     */
    public headCellContent?: ChildComponent<IHeadCellProps>;
    /**
     * @element div
     */
    public headCellResize?: ChildComponent<IHeadCellResizeProps>;
    /**
     * @element span
     */
    public headerFilterButton?: ChildComponent<IHeaderFilterButtonProps>;
    /**
     * @element div
     */
    public headerFilterPopupContent?: ChildComponent<IPopupContentProps<TData>>;
    /**
     * @element tr
     * @see {@link https://komarovalexander.github.io/ka-table/#/header-filter-logic | Header Filter - Logic}
     */
    public headerFilterPopupRow?: ChildComponent<IDataRowProps<HeaderFilterItem>>;
    /**
     * @element input
     */
    public headerFilterPopupSearchInput?: ChildComponent<IFilterRowEditorProps>;
    /**
     * @element td
     * @see {@link https://komarovalexander.github.io/ka-table/#/header-filter-logic | Header Filter - Logic}
     */
    public headerFilterPopupTextCell?: ChildComponent<ICellProps<HeaderFilterItem>>;
    /**
     * @element tr
     */
    public headRow?: ChildComponent<IHeadRowProps>;
    /**
     * @element div
     */
    public loading?: ChildComponent<ILoadingProps>;
    /**
     * @element td
     */
    public noDataCell?: ChildComponent<INoDataRowProps>;
    /**
     * @element tr
     * @see {@link https://komarovalexander.github.io/ka-table/#/search | Search}
     */
    public noDataRow?: ChildComponent<INoDataRowProps>;
    /**
     * @element div
     */
    public paging?: ChildComponent<IPagingProps>;
    /**
     * @element li
     * @see {@link https://komarovalexander.github.io/ka-table/#/bootstrap | Bootstrap}
     */
    public pagingIndex?: ChildComponent<IPagingIndexProps>;
    /**
     * @element ul
     * @see {@link https://komarovalexander.github.io/ka-table/#/bootstrap | Bootstrap}
     */
    public pagingPages?: ChildComponent<IPagingProps>;
    /**
     * @element li
     * @see {@link https://komarovalexander.github.io/ka-table/#/paging | Paging}
     */
    public pagingSize?: ChildComponent<IPagingSizeProps>;
    /**
     * @element ul
     * @see {@link https://komarovalexander.github.io/ka-table/#/paging | Paging}
     */
    public pagingSizes?: ChildComponent<IPagingProps>;
    /**
     * @element div.ka
     */
    public rootDiv?: ChildComponent<ITableProps<TData>>;
    /**
     * @element span
     * @see {@link https://komarovalexander.github.io/ka-table/#/sorting | Sorting}
     */
    public sortIcon?: ChildComponent<ISortIconProps>;
    /**
     * @element td
     * @see {@link https://komarovalexander.github.io/ka-table/#/summary | Summary}
     */
    public summaryCell?: ChildComponent<ISummaryCellProps<TData>>;
    /**
     * @element tr
     */
    public summaryRow?: ChildComponent<ISummaryRowProps<TData>>;
    /**
     * @element table
     */
    public table?: ChildComponent<ITableProps<TData>>;
    /**
     * @element tbody
     */
    public tableBody?: ChildComponent<ITableBodyProps<TData>>;
    /**
     * @element tfoot
     */
    public tableFoot?: ChildComponent<ITableFootProps<TData>>;
    /**
     * @element thead
     */
    public tableHead?: ChildComponent<ITableHeadProps>;
    /**
     * @element div
     */
    public tableWrapper?: ChildComponent<ITableProps<TData>>;
}
