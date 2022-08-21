import { ITableProps } from '../';
import {
  ICellEditorProps, ICellProps, ICellTextProps, IDataRowProps, IFilterRowEditorProps,
  IGroupRowProps, IGroupSummaryCellProps, IGroupSummaryRowProps, IHeadCellProps,
  IHeadCellResizeProps, IHeaderFilterButtonProps, IHeadRowProps, ILoadingProps, INoDataRowProps,
  IPagingIndexProps, IPagingProps, IPagingSizeProps, IPopupContentItemProps, IPopupContentProps,
  ISummaryCellProps, ISummaryRowProps, ITableBodyProps, ITableFootProps, ITableHeadProps,
} from '../props';
import { ChildComponent } from './ChildComponent';

export class ChildComponents {
  public cell?: ChildComponent<ICellProps>;
  public cellEditor?: ChildComponent<ICellEditorProps>;
  public cellEditorInput?: ChildComponent<ICellEditorProps>;
  public cellText?: ChildComponent<ICellTextProps>;
  public dataRow?: ChildComponent<IDataRowProps>;
  public detailsRow?: ChildComponent<IDataRowProps>;
  public filterRowCell?: ChildComponent<IFilterRowEditorProps>;
  public groupCell?: ChildComponent<IGroupRowProps>;
  public groupRow?: ChildComponent<IGroupRowProps>;
  public groupSummaryRow?: ChildComponent<IGroupSummaryRowProps>;
  public groupSummaryCell?: ChildComponent<IGroupSummaryCellProps>;
  public headFilterButton?: ChildComponent<IHeaderFilterButtonProps>;
  public headCell?: ChildComponent<IHeadCellProps>;
  public headCellContent?: ChildComponent<IHeadCellProps>;
  public headCellResize?: ChildComponent<IHeadCellResizeProps>;
  public headRow?: ChildComponent<IHeadRowProps>;
  public loading?: ChildComponent<ILoadingProps>;
  public noDataRow?: ChildComponent<INoDataRowProps>;
  public paging?: ChildComponent<IPagingProps>;
  public pagingIndex?: ChildComponent<IPagingIndexProps>;
  public pagingPages?: ChildComponent<IPagingProps>;
  public pagingSize?: ChildComponent<IPagingSizeProps>;
  public pagingSizes?: ChildComponent<IPagingProps>;
  public popupContent?: ChildComponent<IPopupContentProps>;
  public popupContentItem?: ChildComponent<IPopupContentItemProps>;
  public rootDiv?: ChildComponent<ITableProps>;
  public summaryCell?: ChildComponent<ISummaryCellProps>;
  public summaryRow?: ChildComponent<ISummaryRowProps>;
  public table?: ChildComponent<ITableProps>;
  public tableBody?: ChildComponent<ITableBodyProps>;
  public tableFoot?: ChildComponent<ITableFootProps>;
  public tableHead?: ChildComponent<ITableHeadProps>;
  public tableWrapper?: ChildComponent<ITableProps>;
}
