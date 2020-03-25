import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import Loading, { ILoadingProps } from './Loading';

Enzyme.configure({ adapter: new Adapter() });

const props: ILoadingProps = {
  loading: true 
};

it('renders without crashing', () => {
  const element = document.createElement('div');
  ReactDOM.render(<Loading {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});
