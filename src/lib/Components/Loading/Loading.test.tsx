import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme from 'enzyme';
import { ILoadingProps } from '../../props';
import Loading from './Loading';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: ILoadingProps = {
    enabled: true,
};

it('renders without crashing', () => {
    const element = document.createElement('div');
    const root = createRoot(element!);
    root.render(<Loading  {...props} />);
    root.unmount();
});
