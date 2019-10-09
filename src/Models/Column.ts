import { DataType } from '../Enums/DataType';
import { SortDirection } from '../Enums/SortDirection';
import { EditorFunc } from '../Types/EditorFunc';

/**
 * Describes the columns in table and their look and behaviour
 */
export class Column {
  /*
  * Specifies the field of data which value will be used in column
  */
  public field!: string;

  /*
  * Specifies the text of the header
  */
  public title!: string;

  /*
  * Specifies the data type of the column
  */
  public dataType!: DataType;

  /*
  * Sort rows by column. Available values: 'ascend' | 'descend'
  */
  public sortDirection?: SortDirection;

  /*
  * Sets the custom editor
  */
  public editor?: EditorFunc;
}
