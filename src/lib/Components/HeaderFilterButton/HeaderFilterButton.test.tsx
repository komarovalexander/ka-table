import Enzyme, { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { ActionType } from '../../enums';
import { Column } from '../../models';
import { IHeaderFilterButtonProps } from '../../props';
import HeaderFilterButton from './HeaderFilterButton';

Enzyme.configure({ adapter: new Adapter() });

const props: IHeaderFilterButtonProps = {
    column: new Column(),
    dispatch: jest.fn()
};

it('renders without crashing', () => {
    const element = document.createElement('div');
    ReactDOM.render(<HeaderFilterButton {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
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
