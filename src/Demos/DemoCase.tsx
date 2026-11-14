import { ReactNode } from 'react';

export class DemoCase {
    public demoComponent!: () => ReactNode;
    public name!: string;
    public path!: string;
    public title!: string;
    public group!: string;
}
