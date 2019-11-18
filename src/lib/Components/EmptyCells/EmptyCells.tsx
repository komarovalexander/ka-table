import * as React from 'react';

export interface IEmptyCellsProps {
  count: number;
}

const EmptyCells: React.FunctionComponent<IEmptyCellsProps> = ({ count }) => {
  return (
    <>
      {[...Array(count)].map((item, index) => <th key={index} className='tc-empty-cell'/>)}
    </>
  );
};

export default EmptyCells;
