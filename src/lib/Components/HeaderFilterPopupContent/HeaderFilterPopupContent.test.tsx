import HeaderFilterPopupContent from './HeaderFilterPopupContent';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { render } from '@testing-library/react';
import { IHeaderFilterPopupProps } from '../../props';

const props = {
    column: {key: 'field'},
    childComponents: {},
    dispatch: () => {},
    data: [{ feild: 1 }]
} as IHeaderFilterPopupProps;

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<HeaderFilterPopupContent {...props} />);
    root.unmount();
});

it('lists the values of format which are 0 and an empty text', () => {
    const { container } = render(
        <HeaderFilterPopupContent
            {...props}
            column={{ key: 'score' }}
            data={[{ score: 0.4 }, { score: 2.6 }, { score: -1 }]}
            format={({ value }) => (typeof value === 'number' && (value < 0 ? '' : Math.round(value)))}
        />
    );
    expect(Array.from(container.querySelectorAll('tbody tr')).map((row) => row.textContent!.trim())).toEqual(['0', '3', '']);
});
