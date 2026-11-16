import { AllHTMLAttributes } from 'react';

import { DispatchFunc } from '../types';

export class AttributeTableData<T> {
    /**
     * Contains the default function of the overridden attribute, e.g. the `onClick` which the table sets: it is easy to
     * add additional logic and execute the default behaviour where you want it
     */
    public baseFunc!: (...args: unknown[]) => void;
    /**
     * Default HTMLAttributes of the component
     */
    public childElementAttributes!: AllHTMLAttributes<HTMLElement>;
    /**
     * Dispatches an action of the table or of your own code
     */
    public dispatch!: DispatchFunc;
    /**
     * Props of the component
     */
    public childProps!: T;
}
