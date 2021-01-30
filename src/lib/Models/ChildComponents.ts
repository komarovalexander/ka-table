import { ITableProps } from '../';
import {
  ICellEditorProps, ICellProps, ICellTextProps, IDataRowProps, IFilterRowEditorProps,
  IGroupRowProps, IHeadCellProps, IHeadCellResizeProps, IHeadRowProps, INoDataRowProps,
  IPagingIndexProps, IPagingPagesProps, IPagingProps, ITableBodyProps, ITableHeadProps,
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
  public headCell?: ChildComponent<IHeadCellProps>;
  public headCellContent?: ChildComponent<IHeadCellProps>;
  public headCellResize?: ChildComponent<IHeadCellResizeProps>;
  public headRow?: ChildComponent<IHeadRowProps>;
  public noDataRow?: ChildComponent<INoDataRowProps>;
  public paging?: ChildComponent<IPagingProps>;
  public pagingIndex?: ChildComponent<IPagingIndexProps>;
  public pagingPages?: ChildComponent<IPagingPagesProps>;
  public rootDiv?: ChildComponent<ITableProps>;
  public table?: ChildComponent<ITableProps>;
  public tableBody?: ChildComponent<ITableBodyProps>;
  public tableHead?: ChildComponent<ITableHeadProps>;
  public tableWrapper?: ChildComponent<ITableProps>;
}
