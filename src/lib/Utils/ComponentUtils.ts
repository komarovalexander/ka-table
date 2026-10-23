import React, { AllHTMLAttributes } from 'react';

import { ChildComponent } from '../Models/ChildComponent';
import { ChildAttributesItem } from '../types';
import { extendProps } from './PropsUtils';

class ElementCustomization<T = HTMLElement> {
    content?: React.ReactNode;
    elementAttributes!: React.AllHTMLAttributes<T>;
}
// childComponent: the customization of the component (ChildComponent<never> takes the customizations of all the components),
// it gets the props of the component
export function getElementCustomization<T = HTMLElement>(
    childElementAttributes: AllHTMLAttributes<T>,
    props: unknown,
    childComponent?: ChildComponent<never>,
): ElementCustomization<T> {
    const elementAttributes = extendProps<T>(childElementAttributes, props, childComponent);
    const content = childComponent && childComponent.content && childComponent.content(props as never);

    return {
        content,
        elementAttributes,
    }
};

export const addElementAttributes = <TProps extends object>(
    elementAttributes: ChildAttributesItem<TProps>,
    props: TProps,
    childComponent?: ChildComponent<TProps>,
): ChildComponent<TProps> => {
    const updatedChildComponent: ChildComponent<TProps> = { ...childComponent };
    const defaultElementAttributes = updatedChildComponent.elementAttributes && updatedChildComponent.elementAttributes(props);
    updatedChildComponent.elementAttributes = () => ({...defaultElementAttributes, ...elementAttributes});
    return updatedChildComponent
}
