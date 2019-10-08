import { DataType } from '../Enums/DataType';
import { SortDirection } from '../Enums/SortDirection';

export class DefaultOptions {
  public static columnSortDirection: SortDirection = SortDirection.Ascend;
  public static columnDataType = DataType.String;
}
