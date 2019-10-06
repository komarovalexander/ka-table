/**
 * Describes the position of cell in table
 */
export class Cell {
  /*
  * Specifies the field of data which value will be used in cell
  */
  public field!: string;

  /*
  * Specifies the value of row's key where cell is placed
  */
  public rowKeyValue!: any;
}
