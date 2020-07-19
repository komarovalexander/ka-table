import { DataType, SortDirection } from '../enums';
import { Field } from '../types';

export class Column {
  public dataType?: DataType;
  public filterRowValue?: any;
  public filterRowOperator?: any;
  public field?: Field;
  public isEditable?: boolean;
  public isResizable?: boolean;
  public key!: string;
  public sortDirection?: SortDirection;
  public style?: React.CSSProperties;
  public title?: string;
}
