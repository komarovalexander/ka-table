import { DataType, SortDirection, TextAlign } from '../enums';
import { CellFunc, EditorFunc, SearchFunc, ValidationFunc } from '../types';

/**
 * Describes column of table its look and behaviour
 */
export class Column {
  /*
  * Unique identifier for the column. If it is not set, field will be used as its value
  */
  public key?: string;
  /*
  * Specifies the field of data which value will be used in column
  */
  public field!: string;

  /*
  * Specifies the text of the header
  */
  public title?: string;

  /*
  * Specifies the data type of the column
  */
  public dataType?: DataType = DataType.String;

  /*
  * Sort rows by column
  */
  public sortDirection?: SortDirection;

  /*
  * Sets the custom editor
  */
  public editor?: EditorFunc;

  /*
  * Sets the custom cell
  */
  public cell?: CellFunc;

  /*
  * Sets the width
  */
  public width?: number | string;

  /*
  * Sets column's text alignment
  */
  public textAlign?: TextAlign;

  /*
  * Sets the search
  */
  public search?: SearchFunc;

  /*
  * Sets the validation rule for the cell
  */
  public validation?: ValidationFunc;

  /*
  * Column which is not binded to specific field
  */
  public isCustom?: boolean;
}
