import { ITableAllProps } from '../';
import { ICellContentProps } from '../Components/CellContent/CellContent';
import { IDataRowProps } from '../Components/DataRowContent/DataRowContent';
import { ChildAttributesItem } from '../types';

export class ChildAttributes {
  public cell?: ChildAttributesItem<ICellContentProps>;
  public table?: ChildAttributesItem<ITableAllProps>;
  public dataRow?: ChildAttributesItem<IDataRowProps>;
}
