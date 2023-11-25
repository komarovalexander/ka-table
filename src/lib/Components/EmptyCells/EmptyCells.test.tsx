import EmptyCells from './EmptyCells';
import { IEmptyCellsProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: IEmptyCellsProps = {
    count: 1,
};

it('renders without crashing', () => {
    const element = document.createElement('tr');
    const root = createRoot(element!);
    root.render(<EmptyCells {...props} />);
    root.unmount();
});

it('renders without crashing with isTh', () => {
    const element = document.createElement('tr');
    const root = createRoot(element!);
    root.render(<EmptyCells {...props} isTh={true}/>);
    root.unmount();
});
