import { Bivariant } from '../types';
import { DataType } from '../enums';

export class FilterOperator {
    public compare!: Bivariant<(fieldValue: unknown, conditionValue: unknown, rowData?: unknown) => boolean>;
    public defaultForTypes?: DataType[];
    public name!: string;
}
