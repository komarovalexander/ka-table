import React from 'react';

import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/CoponentUtils';
import { IRowProps } from '../DataRow/DataRow';
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
