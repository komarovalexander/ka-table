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

export const MemoizeComponent = (
  Component: any,
  getChildComponent: (props: any) => (ChildComponent<any> | undefined)
): React.FunctionComponent<any> => {
  const ComponentMemo: React.FunctionComponent<any> = React.memo(Component, (prevProps: any, nextProps: any) => {
    const childComponent = getChildComponent(nextProps);
    if (childComponent && childComponent.propsAreEqual) {
      return childComponent.propsAreEqual(prevProps, nextProps);
    }
    return false;
  });
  return (props) => {
    const childComponent = getChildComponent(props);
    if (childComponent && childComponent.propsAreEqual){
      return <ComponentMemo {...props} />;
    } else {
      return <Component {...props} />;
    }
  }
}
