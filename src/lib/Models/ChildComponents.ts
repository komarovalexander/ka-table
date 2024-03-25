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
    IPopupContentItemProps,
    IPopupContentProps,
    ISortIconProps,
    ISummaryCellProps,
    ISummaryRowProps,
    ITableBodyProps,
    ITableFootProps,
    ITableHeadProps,
} from '../props';

import { ChildComponent } from './ChildComponent';
import { ITableProps } from '../';

export class ChildComponents<T = any> {
    public cell?: ChildComponent<ICellProps<T>>;
    public cellEditor?: ChildComponent<ICellEditorProps<T>>;
    public cellEditorInput?: ChildComponent<ICellEditorProps<T>>;
    public cellText?: ChildComponent<ICellTextProps<T>>;
    public dataRow?: ChildComponent<IDataRowProps<T>>;
    public detailsCell?: ChildComponent<IDataRowProps<T>>;
    public detailsRow?: ChildComponent<IDataRowProps<T>>;
    public emptyCell?: ChildComponent<IEmptyCellProps>;
    public filterRowCell?: ChildComponent<IFilterRowEditorProps>;
    public groupPanel?: ChildComponent<IGroupPanelProps>;
    public groupPanelCell?: ChildComponent<IGroupPanelCellProps>;
    public groupExpandButton?: ChildComponent<IGroupRowProps<T>>;
    public groupCell?: ChildComponent<IGroupRowProps<T>>;
    public groupRow?: ChildComponent<IGroupRowProps<T>>;
    public groupSummaryRow?: ChildComponent<IGroupSummaryRowProps>;
    public groupSummaryCell?: ChildComponent<IGroupSummaryCellProps>;
    public headFilterButton?: ChildComponent<IHeaderFilterButtonProps>;
    public headCell?: ChildComponent<IHeadCellProps>;
    public headCellContent?: ChildComponent<IHeadCellProps>;
    public headCellResize?: ChildComponent<IHeadCellResizeProps>;
    public headRow?: ChildComponent<IHeadRowProps>;
    public loading?: ChildComponent<ILoadingProps>;
    public noDataRow?: ChildComponent<INoDataRowProps>;
    public noDataCell?: ChildComponent<INoDataRowProps>;
    public paging?: ChildComponent<IPagingProps>;
    public pagingIndex?: ChildComponent<IPagingIndexProps>;
    public pagingPages?: ChildComponent<IPagingProps>;
    public pagingSize?: ChildComponent<IPagingSizeProps>;
    public pagingSizes?: ChildComponent<IPagingProps>;
    public popupContent?: ChildComponent<IPopupContentProps>;
    public popupContentItem?: ChildComponent<IPopupContentItemProps>;
    public popupContentItemText?: ChildComponent<IPopupContentItemProps>;
    public rootDiv?: ChildComponent<ITableProps<T>>;
    public sortIcon?: ChildComponent<ISortIconProps>;
    public summaryCell?: ChildComponent<ISummaryCellProps>;
    public summaryRow?: ChildComponent<ISummaryRowProps>;
    public table?: ChildComponent<ITableProps>;
    public tableBody?: ChildComponent<ITableBodyProps>;
    public tableFoot?: ChildComponent<ITableFootProps>;
    public tableHead?: ChildComponent<ITableHeadProps>;
    public tableWrapper?: ChildComponent<ITableProps>;
}
