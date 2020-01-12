import { HTMLAttributes } from 'react';

import { ChildProps, DispatchFunc } from '../types';

export class AttributeTableData {
  public baseFunc!: any;
  public childElementAttributes!: HTMLAttributes<HTMLElement>;
  public childProps!: ChildProps;
  public dispatch!: DispatchFunc;
}
