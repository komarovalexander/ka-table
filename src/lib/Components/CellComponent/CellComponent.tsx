import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { ICellProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import CellEditor from '../CellEditor/CellEditor';
import CellText from '../CellText/CellText';

const CellComponent: React.FunctionComponent<ICellProps> = (props) => {
  const {
    treeDeep,
    treeArrowElement,
    childComponents,
    column: { style },
    isEditableCell,
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.cell} ${treeDeep != null ? defaultOptions.css.treeCell : ''}`,
    style
  }, props, childComponents.cell);
  return (
    <td {...elementAttributes}>
      {treeDeep ? Array(treeDeep).fill(undefined).map((_, index) => <div key={index} className={'ka-empty-space'}/>) : null}
      { content ||
      (
        <>
          {treeArrowElement}
          {isEditableCell ?
          (
            <CellEditor {...props} />
          )
          :
          (
            <CellText {...props} />
          )}
        </>
      )
      }
    </td>
  );
};

export default CellComponent;
