import { HTMLAttributes } from 'react';

import { DispatchFunc } from '../types';

export class AttributeTableData<T> {
  public baseFunc!: any;
  public childElementAttributes!: HTMLAttributes<HTMLElement>;
  public dispatch!: DispatchFunc;
  public childProps!: T;
}
