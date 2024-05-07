import { PropsWithChildren } from 'react';

import { ChildAttributesItem } from '../types';

export class ChildComponent<TProps> {
    public elementAttributes?: (props: PropsWithChildren<TProps>) => (ChildAttributesItem<TProps> | void);
    public content?: (props: PropsWithChildren<TProps>) => any;
}
