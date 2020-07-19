import React from 'react';

import defaultOptions from '../../defaultOptions';
import { IRowProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import DataRowContent from '../DataRowContent/DataRowContent';
import EmptyCells from '../EmptyCells/EmptyCells';

const DataRow: React.FunctionComponent<IRowProps> = (props) => {
  const {
    childComponents : { dataRow },
    groupColumnsCount,
    isSelectedRow,
    trRef,
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.row} ${isSelectedRow ? defaultOptions.css.rowSelected : ''}`,
  }, props, dataRow);

  return (
    <tr {...elementAttributes} ref={trRef} >
      <EmptyCells count={groupColumnsCount}/>
      {content
        ? <td className={defaultOptions.css.cell}>{content}</td>
        : <DataRowContent {...props}/>}
    </tr>
  );
};


export default DataRow;
