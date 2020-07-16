import React, { AllHTMLAttributes } from 'react';

import { ChildComponent } from '../Models/ChildComponent';
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
