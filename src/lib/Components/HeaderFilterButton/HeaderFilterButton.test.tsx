import { act, fireEvent, render } from '@testing-library/react';

import { ActionType } from '../../enums';
import { Column } from '../../models';
import HeaderFilterButton from './HeaderFilterButton';
import { IHeaderFilterButtonProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: IHeaderFilterButtonProps = {
    column: new Column(),
    dispatch: jest.fn()
};

it('renders without crashing', () => {
    const element = document.createElement('div');
    const root = createRoot(element!);
    act(() => {
        root.render(<HeaderFilterButton  {...props} />);
    });
    act(() => {
        root.unmount();
    });
});

it('should dispatch updateHeaderFilterPopupState onClick', () => {
    const { container } = render(<HeaderFilterButton {...props} column={{ key: 'fieldTest', isHeaderFilterPopupShown: false }} dispatch={props.dispatch} />);
    fireEvent.click(container.querySelector('.ka-header-filter-button')!);
    expect(props.dispatch).toHaveBeenCalledWith({
        columnKey: 'fieldTest',
        isHeaderFilterPopupShown: true,
        type: ActionType.UpdateHeaderFilterPopupState
    });
});
