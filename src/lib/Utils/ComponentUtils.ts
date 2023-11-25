import React, { AllHTMLAttributes } from 'react';

import { ChildComponent } from '../Models/ChildComponent';
import { ChildAttributesItem } from '../types';
import { extendProps } from './PropsUtils';

class ElementCustomization<T = HTMLElement> {
    content?: any;
    elementAttributes!: React.AllHTMLAttributes<T>;
}
export function getElementCustomization<T = HTMLElement>(
    childElementAttributes: AllHTMLAttributes<T>,
    props: any,
    childComponent?: ChildComponent<any>,
) : ElementCustomization<T> {
    const elementAttributes = extendProps<T>(childElementAttributes, props, childComponent);
    const content = childComponent && childComponent.content && childComponent.content(props);

    return {
        content,
        elementAttributes,
    }
};

export const addElementAttributes = (
    elementAttributes: ChildAttributesItem<any>,
    props: any,
    childComponent?: ChildComponent<any>,
): ChildComponent<any> => {
    const updatedChildComponent: ChildComponent<any> = { ...childComponent };
    const defaultElementAttributes = updatedChildComponent.elementAttributes && updatedChildComponent.elementAttributes(props);
    updatedChildComponent.elementAttributes = () => ({...defaultElementAttributes, ...elementAttributes});
    return updatedChildComponent
}
