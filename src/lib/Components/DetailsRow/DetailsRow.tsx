import React from 'react';

import defaultOptions from '../../defaultOptions';
import { IRowProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import EmptyCells from '../EmptyCells/EmptyCells';

const DetailsRow: React.FunctionComponent<IRowProps> = (props) => {
  const { groupColumnsCount, childComponents, columns } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.detailsRow}`,
  }, props, childComponents.detailsRow);
  return (
    <tr {...elementAttributes} >
      <EmptyCells count={groupColumnsCount}/>
      {content
        && <td className={defaultOptions.css.cell} colSpan={columns.length}>{content}</td>}
    </tr>
  );
};

export default DetailsRow;
