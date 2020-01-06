import { HTMLAttributes } from 'react';
import { isFunction } from 'util';

import { ChildAttributesItem, IChildProps } from '../types';

const emptyFunc = () => {};
export const mergeProps = (
  childElementAttributes: HTMLAttributes<HTMLElement>,
  childProps: IChildProps,
  childCustomAttributes: ChildAttributesItem): React.HTMLAttributes<HTMLElement> => {
  const customPropsWithEvents: any = {};
  for (const prop in childCustomAttributes) {
    if (childCustomAttributes.hasOwnProperty(prop)) {
      const propName = prop as string;
      const propValue: any = (childCustomAttributes as any)[propName];
      const baseFunc = (childElementAttributes as any)[propName] || emptyFunc;
      if (isFunction(propValue)) {
        customPropsWithEvents[prop] = (e: any) => {
          propValue(e, {
            baseFunc,
            childElementAttributes,
            childProps,
            dispatch: childProps.dispatch,
          });
        };
      }
    }
  }
  const mergedResult: React.HTMLAttributes<HTMLDivElement> = {
    ...childElementAttributes,
    ...childCustomAttributes,
    ...customPropsWithEvents,
    ...{
      className: `${childElementAttributes.className || ''} ${childCustomAttributes.className || ''}`,
  }};

  return mergedResult;
};
