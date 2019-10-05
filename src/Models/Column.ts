import { SortDirection } from '../Enums/SortDirection';

/**
 * Column
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
