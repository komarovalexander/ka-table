import * as React from 'react';

export interface IEmptyCellsProps {
  count: number;
  shouldUseTh?: boolean;
}

const EmptyCells: React.FunctionComponent<IEmptyCellsProps> = ({ count, shouldUseTh }) => {
  return (
    <>
      {[...Array(count)].map((item, index) =>
        shouldUseTh ?
          <th key={index} className='tc-empty-cell'/> :
          <td key={index} className='tc-empty-cell'/>)}
    </>
  );
};

export default EmptyCells;
