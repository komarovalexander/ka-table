import React from 'react';
import ReactDOM from 'react-dom';

import emptyFunc from '../../emptyFunc';
import FilterRow, { IFilterRowProps } from './FilterRow';

const props: IFilterRowProps = {
  columns: [],
  filterRow: [{
    field: 'name',
    operator: '=',
    value: 'Billi Bob',
  }],
  onOptionChanged: emptyFunc,
};

it('renders without crashing', () => {
  const element = document.createElement('tbody');
  ReactDOM.render(<FilterRow {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});
