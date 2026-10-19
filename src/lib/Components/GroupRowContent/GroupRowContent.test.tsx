import { ActionType } from '../../enums';
import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import GroupRowContent from './GroupRowContent';
import { IGroupRowProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act, fireEvent } from '@testing-library/react';
import { renderInto } from '../../../testUtils/renderInto';

const props: IGroupRowProps = {
    childComponents: {},
    column: { key: 'field' },
    contentColSpan: 0,
    dispatch: jest.fn(),
    groupIndex: 0,
    groupKey: ['group'],
    isExpanded: false,
    text: '',
};

describe('GroupRowContent', () => {
    it('renders without crashing', () => {
        const element = document.createElement('tr');
        const root = createRoot(element!);
        act(() => {
            root.render(<GroupRowContent {...props} />);
        });
        act(() => {
            root.unmount();
        });
    });

    it('onClick should change groupsExpanded', () => {
        const { container } = renderInto('tr', <GroupRowContent {...props} />);
        fireEvent.click(container.querySelector('.ka-icon-group-arrow')!);
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            groupKey: ['group'],
            type: ActionType.UpdateGroupsExpanded,
        });
    });

    it('Should render custom group cell', () => {
        const column: Column = {
            key: 'field',
        };
        const childComponents: ChildComponents = {
            groupCell: {
                content: () => <div className='custom-group-cell' />,
            },
        };
        const { container } = renderInto('tr', (
            <GroupRowContent
                {...props}
                childComponents={childComponents}
                column={column}
            />
        ));
        expect(container.querySelectorAll('.custom-group-cell').length).toBe(1);
    });
});
