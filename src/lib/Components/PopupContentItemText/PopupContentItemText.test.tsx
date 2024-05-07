import PopupContentItemText from './PopupContentItemText';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: any = {
    column: {key: 'field'},
    childComponents: {},
    dispatch: () => {},
    item: ''
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<PopupContentItemText {...props} />);
    root.unmount();
});
