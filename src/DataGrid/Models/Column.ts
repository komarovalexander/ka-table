import { SortDirection } from '../Enums/SortDirection';

export class Column {
  public key!: string;
  public name!: string;
  public sortDirection?: SortDirection;
}
