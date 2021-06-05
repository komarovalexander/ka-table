import Enzyme from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Loading, { ILoadingProps } from './Loading';

Enzyme.configure({ adapter: new Adapter() });

const props: ILoadingProps = {
    enabled: true
};

it('renders without crashing', () => {
  const element = document.createElement('div');
  ReactDOM.render(<Loading {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});
