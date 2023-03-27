import * as React from 'react';

import EmptyCells from '../EmptyCells/EmptyCells';
import { IColGroupProps } from '../../props';

export const ColGroup: React.FunctionComponent<IColGroupProps> = ({ columns, groupColumnsCount }) => {
  return (
    <colgroup>
      <EmptyCells count={groupColumnsCount} isColGroup={true}/>
      {columns.map(c => <col key={c.key} {...c.colGroup} width={c.width || c.colGroup?.width || c.colGroup?.style?.width} />)}
    </colgroup>
  );
};
