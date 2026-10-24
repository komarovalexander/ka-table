import Popup from './HeaderFilterPopup';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { IHeaderFilterPopupProps } from '../../props';

const props = {
    column: {key: 'field'},
    childComponents: {},
    dispatch: () => {},
    data: [{ field: 1 }]
} as IHeaderFilterPopupProps;

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<Popup {...props} />);
    root.unmount();
});
