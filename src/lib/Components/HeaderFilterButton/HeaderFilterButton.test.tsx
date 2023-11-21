import Enzyme, { mount } from 'enzyme';

import { ActionType } from '../../enums';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { Column } from '../../models';
import HeaderFilterButton from './HeaderFilterButton';
import { IHeaderFilterButtonProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: IHeaderFilterButtonProps = {
    column: new Column(),
    dispatch: jest.fn()
};

it('renders without crashing', () => {
    const element = document.createElement('div');
    const root = createRoot(element!); 
    root.render(<HeaderFilterButton  {...props} />);
    root.unmount();
});

it('should dispatch updateHeaderFilterPopupState onClick', () => {
    const wrapper = mount(<HeaderFilterButton {...props} column={{ key: 'fieldTest', isHeaderFilterPopupShown: false }} dispatch={props.dispatch} />);
    wrapper.find('.ka-header-filter-button').simulate('click');
    expect(props.dispatch).toHaveBeenCalledWith({
        columnKey: 'fieldTest',
        isHeaderFilterPopupShown: true,
        type: ActionType.UpdateHeaderFilterPopupState
    });
});
