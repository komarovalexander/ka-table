import React from 'react';
import ReactDOM from 'react-dom';

import { ActionType } from '../../enums';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Column } from '../../models';
import FilterPopupButton, { FilterPopupButtonProps } from './FilterPopupButton';

Enzyme.configure({ adapter: new Adapter() });

const props: FilterPopupButtonProps = {
    column: new Column(),
    dispatch: jest.fn()
};

it('renders without crashing', () => {
    const element = document.createElement('span');
    ReactDOM.render(<FilterPopupButton {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
});

it('should dispatch updateHeaderFilterPopupState onClick', () => {
    const wrapper = mount(<FilterPopupButton {...props} column={{ key: 'fieldTest', isHeaderFilterPopupShown: false }} dispatch={props.dispatch} />);
    wrapper.find('.ka-icon-header-filter').simulate('click');
    expect(props.dispatch).toBeCalledWith({
        columnKey: 'fieldTest',
        isHeaderFilterPopupShown: true,
        type: ActionType.UpdateHeaderFilterPopupState
    });
});
