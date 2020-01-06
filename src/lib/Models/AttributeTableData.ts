import { HTMLAttributes } from 'react';

import { DispatchFunc, IChildProps } from '../types';

export class AttributeTableData {
  public baseFunc!: any;
  public childElementAttributes!: HTMLAttributes<HTMLElement>;
  public childProps!: IChildProps;
  public dispatch!: DispatchFunc;
}
