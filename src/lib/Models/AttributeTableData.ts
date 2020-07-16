import { AllHTMLAttributes } from 'react';

import { DispatchFunc } from '../types';

export class AttributeTableData<T> {
  public baseFunc!: any;
  public childElementAttributes!: AllHTMLAttributes<HTMLElement>;
  public dispatch!: DispatchFunc;
  public childProps!: T;
}
