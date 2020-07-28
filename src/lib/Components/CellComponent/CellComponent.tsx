import * as React from 'react';

import { kaDefaultOptions } from '../../';
import { ICellProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import CellEditor from '../CellEditor/CellEditor';
import CellText from '../CellText/CellText';

const CellComponent: React.FunctionComponent<ICellProps> = (props) => {
  const {
    childComponents,
    column: { style },
    isEditableCell,
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: kaDefaultOptions.css.cell,
    style
  }, props, childComponents.cell);

  return (
    <td {...elementAttributes}>
      { content ||
      (
        isEditableCell ?
        (
          <CellEditor
            {...props}
          />
        )
        :
        (
          <CellText
            {...props}
          />
        )
      )
      }
    </td>
  );
};

export default CellComponent;
