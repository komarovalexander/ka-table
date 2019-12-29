import { FilterCondition } from '../../../dist/Models/FilterCondition';
import defaultOptions from '../defaultOptions';
import { DataType, SortDirection } from '../enums';
import {
  CellFunc, EditorFunc, FormatFunc, HeaderCellFunc, SearchFunc, ValidationFunc,
} from '../types';

/**
 * Describes column of table its look and behaviour
 */
export class Column {
  public cell?: CellFunc;
  public dataType?: DataType = defaultOptions.columnDataType;
  public editor?: EditorFunc;
  public filterRowCell?: EditorFunc;
  public filterRowValue?: any;
  public filterRowOperator?: any;
  public field?: string;
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
