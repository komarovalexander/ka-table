import { DataType, SortDirection } from '../enums';
import {
  CellFunc, EditorFunc, Field, FilterRowFunc, FormatFunc, HeaderCellFunc, SearchFunc,
  ValidationFunc,
} from '../types';

/**
 * Describes column of table its look and behaviour
 */
export class Column {
  public cell?: CellFunc;
  public dataType?: DataType;
  public editor?: EditorFunc;
  public filterRowCell?: FilterRowFunc;
  public filterRowValue?: any;
  public filterRowOperator?: any;
  public field?: Field;
  public parentFields?: Field[];
  public format?: FormatFunc;
  public headCell?: HeaderCellFunc;
  public isEditable?: boolean;
  public key!: string;
  public search?: SearchFunc;
  public sortDirection?: SortDirection;
  public style?: React.CSSProperties;
  public title?: string;
  public validation?: ValidationFunc;
}
