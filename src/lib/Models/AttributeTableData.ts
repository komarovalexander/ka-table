import { AllHTMLAttributes } from 'react';

import { DispatchFunc } from '../types';

export class AttributeTableData<T> {
    // the attribute of the element which the table sets, e.g. its onClick
    public baseFunc!: (...args: unknown[]) => void;
    public childElementAttributes!: AllHTMLAttributes<HTMLElement>;
    public dispatch!: DispatchFunc;
    public childProps!: T;
}
