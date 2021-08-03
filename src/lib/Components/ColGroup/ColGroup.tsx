import * as React from 'react';

import { IColGroupProps } from '../../props';
import EmptyCells from '../EmptyCells/EmptyCells';

export const ColGroup: React.FunctionComponent<IColGroupProps> = ({ columns, groupColumnsCount }) => {
  return (
    <colgroup>
      <EmptyCells count={groupColumnsCount} isColGroup={true}/>
      {columns.map(c => <col key={c.key} {...c.col} width={c.width || c.col?.width} />)}
    </colgroup>
  );
};
