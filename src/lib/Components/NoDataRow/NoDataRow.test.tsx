import { act } from '@testing-library/react';
import { INoDataRowProps } from '../../props';
import NoDataRow from './NoDataRow';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { renderInto } from '../../../testUtils/renderInto';

const props: INoDataRowProps = {
    childComponents: {},
    columns: [],
    groupColumnsCount: 0,
} as INoDataRowProps;

it('renders without crashing', () => {
    const div = document.createElement('tbody');
    const root = createRoot(div!);
    act(() => {
        root.render(<NoDataRow  {...props} />);
    });
    act(() => {
        root.unmount();
    });
});

it('custom colspan for cell', () => {
    const { container } = renderInto('tbody', <NoDataRow {...props} childComponents={{
        noDataCell: {
            elementAttributes: () => ({
                colSpan: 100
            })
        }
    }}/>);
    const cell = container.querySelector<HTMLTableCellElement>('.ka-no-data-cell');
    expect(cell).not.toBeNull();
    expect(cell!.colSpan).toBe(100);
});
