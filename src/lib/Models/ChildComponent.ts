import { PropsWithChildren } from 'react';

import { Bivariant, ChildAttributesItem } from '../types';

// the functions are checked bivariantly: the customization of the components of the rows of a type is the customization of a table
export class ChildComponent<TProps> {
    public elementAttributes?: Bivariant<(props: PropsWithChildren<TProps>) => ChildAttributesItem<TProps> | void>;
    // a function component can be the content, so the content returns what a function component returns
    public content?: Bivariant<(props: PropsWithChildren<TProps>) => React.ReactNode | Promise<React.ReactNode>>;
}
