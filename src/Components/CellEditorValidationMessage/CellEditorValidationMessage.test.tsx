import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../Enums/DataType';
import CellEditorValidation, {
  ICellEditorValidationMessageProps,
} from './CellEditorValidationMessage';

const props: ICellEditorValidationMessageProps = {
  message: '',
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<CellEditorValidation {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});
