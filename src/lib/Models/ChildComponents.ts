import { ITableProps } from '../';
import { ICellProps } from '../Components/CellComponent/CellComponent';
import { ICellContentProps } from '../Components/CellContent/CellContent';
import { ICellEditorProps, IFilterRowEditorProps } from '../Components/CellEditor/CellEditor';
import { IDataRowProps } from '../Components/DataRowContent/DataRowContent';
import { IGroupRowProps } from '../Components/GroupRowContent/GroupRowContent';
import { IHeadCellProps } from '../Components/HeadCell/HeadCell';
import { ITableHeadProps } from '../Components/TableHead/TableHead';
import { ChildComponent } from './ChildComponent';

export class ChildComponents {
  public cell?: ChildComponent<ICellProps>;
  public cellEditor?: ChildComponent<ICellEditorProps>;
  public cellText?: ChildComponent<ICellContentProps>;
  public dataRow?: ChildComponent<IDataRowProps>;
  public detailsRow?: ChildComponent<IDataRowProps>;
  public filterRowCell?: ChildComponent<IFilterRowEditorProps>;
  public groupCell?: ChildComponent<IGroupRowProps>;
  public groupRow?: ChildComponent<IGroupRowProps>;
  public headCell?: ChildComponent<IHeadCellProps>;
  public noDataRow?: ChildComponent<any>;
  public table?: ChildComponent<ITableProps>;
  public tableHead?: ChildComponent<ITableHeadProps>;
}
