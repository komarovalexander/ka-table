import { ITableProps } from '../';
import {
  ICellEditorProps, ICellProps, ICellTextProps, IDataRowProps, IFilterRowEditorProps,
  IGroupRowProps, IHeadCellProps, INoDataRowProps, ITableHeadProps,
} from '../props';
import { ChildComponent } from './ChildComponent';

export class ChildComponents {
  public cell?: ChildComponent<ICellProps>;
  public cellEditor?: ChildComponent<ICellEditorProps>;
  public cellText?: ChildComponent<ICellTextProps>;
  public dataRow?: ChildComponent<IDataRowProps>;
  public detailsRow?: ChildComponent<IDataRowProps>;
  public filterRowCell?: ChildComponent<IFilterRowEditorProps>;
  public groupCell?: ChildComponent<IGroupRowProps>;
  public groupRow?: ChildComponent<IGroupRowProps>;
  public headCell?: ChildComponent<IHeadCellProps>;
  public noDataRow?: ChildComponent<INoDataRowProps>;
  public rootDiv?: ChildComponent<ITableProps>;
  public table?: ChildComponent<ITableProps>;
  public tableHead?: ChildComponent<ITableHeadProps>;
}
