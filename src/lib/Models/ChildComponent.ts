import { PropsWithChildren, ReactNode } from 'react';

import { Bivariant, ChildAttributesItem } from '../types';

// the functions are checked bivariantly: the customization of the components of the rows of a type is the customization of a table
export class ChildComponent<TProps> {
    /**
     * @see {@link https://komarovalexander.github.io/ka-table/#/events | Events Demo}
     */
    public elementAttributes?: Bivariant<(props: PropsWithChildren<TProps>) => ChildAttributesItem<TProps> | void>;
    /**
     * `undefined` renders the default content. A function component can be passed as `content`
     * @see {@link https://komarovalexander.github.io/ka-table/#/custom-cell | Custom Cell}
     */
    // a function component can be the content, so the content returns what a function component returns
    public content?: Bivariant<(props: PropsWithChildren<TProps>) => ReactNode | Promise<ReactNode>>;
}
