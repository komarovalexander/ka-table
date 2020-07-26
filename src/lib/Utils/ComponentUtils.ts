import React, { AllHTMLAttributes } from 'react';

import { ChildComponent } from '../Models/ChildComponent';
import { ChildAttributesItem } from '../types';
import { extendProps } from './PropsUtils';

class ElementCustomization {
  content?: any;
  elementAttributes!: React.AllHTMLAttributes<HTMLElement>;
}
export const getElementCustomization = (
  childElementAttributes: AllHTMLAttributes<HTMLElement>,
  props: any,
  childComponent?: ChildComponent<any>,
) : ElementCustomization => {
  const elementAttributes = extendProps(childElementAttributes, props, childComponent);
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
