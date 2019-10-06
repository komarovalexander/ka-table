import { SortDirection } from '../Enums/SortDirection';

/**
 * Describes the columns in table and their look and behaviour
 */
export class Column {
  /*
  * Specifies the field which value will be used in column
  */
  public field!: string;

  /*
  * Specifies the text of the header
  */
  public title!: string;

  /*
  * Sort rows by column. Available values: 'ascend' | 'descend'
  */
  public sortDirection?: SortDirection;
}
