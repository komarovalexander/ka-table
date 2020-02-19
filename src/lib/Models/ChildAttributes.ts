import { ITableAllProps } from '../';
import { ICellContentProps } from '../Components/CellContent/CellContent';
import { IRowProps } from '../Components/DataRow/DataRow';
import { ChildAttributesItem } from '../types';

export class ChildAttributes {
  public cell?: ChildAttributesItem<ICellContentProps>;
  public table?: ChildAttributesItem<ITableAllProps>;
  public dataRow?: ChildAttributesItem<IRowProps>;
}
