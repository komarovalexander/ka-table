import Enzyme, { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { ColGroup } from './ColGroup';

Enzyme.configure({ adapter: new Adapter() });

const props: any = {
  columns: [
    { key: 'column', width: 100 },
    { key: 'column2' },
  ]
};

describe('ColGroup', () => {
  it('renders without crashing', () => {
    const div = document.createElement('table');
    ReactDOM.render(<ColGroup {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('is null in case of empty settings for col group', () => {
    const component = shallow(<ColGroup columns={[{ key: 'column2' }]} groupColumnsCount={0} />);
    expect(component.type()).toEqual(null)
  });
  it('is not null in case of settings for col group to be set', () => {
    const component = shallow(<ColGroup columns={[{ key: 'column2', width: 12 }]} groupColumnsCount={0} />);
    expect(component.type()).toEqual('colgroup')
  });
})
