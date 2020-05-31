import React from 'react';

import defaultOptions from '../../defaultOptions';
import { extendProps } from '../../Utils/PropsUtils';
import { IRowProps } from '../DataRow/DataRow';
import EmptyCells from '../EmptyCells/EmptyCells';

const DetailsRow: React.FunctionComponent<IRowProps> = (props) => {
  const { detailsRow, groupColumnsCount, childAttributes } = props;

  const componentProps: React.HTMLAttributes<HTMLTableRowElement> = {
    className: `${defaultOptions.css.detailsRow}`,
  };
  const divProps = extendProps(componentProps, props, childAttributes.detailsRow, props.dispatch);

  return (
    <tr {...divProps} >
      <EmptyCells count={groupColumnsCount}/>
      {detailsRow
        && <td className={defaultOptions.css.cell}>{detailsRow(props)}</td>}
    </tr>
  );
};

export default DetailsRow;
