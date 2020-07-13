import { PropsWithChildren } from 'react';

import { ChildAttributesItem } from '../types';

export class ChildComponent<TProps> {
  public elementAttributes?: ChildAttributesItem<TProps>;
  public propsAreEqual?: (prevProps: TProps, nextProps: TProps) => boolean;
  public content?: (props: PropsWithChildren<TProps>) => any
}