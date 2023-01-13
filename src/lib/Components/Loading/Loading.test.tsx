import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';
import { ILoadingProps } from '../../props';
import Loading from './Loading';
import React from 'react';
import ReactDOM from 'react-dom';

Enzyme.configure({ adapter: new Adapter() });

const props: ILoadingProps = {
    enabled: true,
};

it('renders without crashing', () => {
    const element = document.createElement('div');
    ReactDOM.render(<Loading {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
});
