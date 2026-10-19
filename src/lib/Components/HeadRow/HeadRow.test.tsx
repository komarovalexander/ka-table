import { act } from '@testing-library/react';
import { DataType } from '../../enums';
import HeaderRow from './HeadRow';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { renderInto } from '../../../testUtils/renderInto';

const props: any = {
    childComponents: {},
    columns: [
        { key: 'column', title: 'Column 1', dataType: DataType.String },
        { key: 'column2', title: 'Column 2', dataType: DataType.String },
    ],
};

it('renders without crashing', () => {
    const element = document.createElement('thead');
    const root = createRoot(element!);
    act(() => {
        root.render(<HeaderRow  {...props} />);
    });
    act(() => {
        root.unmount();
    });
});

it('should handle onMouseDown correctly', () => {
    const { container } = renderInto('thead', (
        <HeaderRow {...props} childComponents={{
            headRow: {
                content: () => <td>Custom</td>
            }
        }} />
    ));
    expect(container.querySelector('td')!.textContent).toBe('Custom');
});
