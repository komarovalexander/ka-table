import { DataType } from '../enums';

export class FilterOperator {
  public compare!: (fieldValue: any, conditionValue: any, rowData?: any[]) => boolean;
  public defaultForTypes?: DataType[];
  public name!: string;
}
