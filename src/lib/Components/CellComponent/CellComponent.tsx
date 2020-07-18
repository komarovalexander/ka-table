import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { ICellProps } from '../../props';
import { getField } from '../../Utils/ColumnUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import CellEditor from '../CellEditor/CellEditor';
import CellText from '../CellText/CellText';

const CellComponent: React.FunctionComponent<ICellProps> = (props) => {
  const {
    childComponents,
    column,
    column: { style },
    isEditableCell,
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.cell,
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
            field={getField(column)}
          />
        )
        :
        (
          <CellText
            {...props}
            field={getField(column)}
          />
        )
      )
      }
    </td>
  );
};

export default CellComponent;
