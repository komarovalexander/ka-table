import { act } from '@testing-library/react';
import { DataType } from '../../enums';
import GroupRow from './GroupRow';
import { IGroupRowProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { renderInto } from '../../../testUtils/renderInto';

const props: IGroupRowProps = {
    childComponents: {},
    column: {
        key: '1',
        field: 'column',
        title: 'Column 1',
        dataType: DataType.String,
    },
    contentColSpan: 2,
    dispatch: vi.fn(),
    groupIndex: 0,
    groupKey: ['group'],
    isExpanded: true,
    text: '',
} as any;

describe('GroupRow', () => {
    it('renders without crashing', () => {
        const element = document.createElement('tbody');
        const root = createRoot(element!);
        act(() => {
            root.render(<GroupRow {...props} />);
        });
        act(() => {
            root.unmount();
        });
    });

    it('Should render custom group cell', () => {
        const groupRow = () => <td className='custom-group-row' />;
        const { container } = renderInto('tbody', (
            <GroupRow
                {...props}
                childComponents={{
                    groupRow: {
                        content: groupRow,
                    },
                }}
            />
        ));
        expect(container.querySelectorAll('.custom-group-row').length).toBe(1);
    });
});
