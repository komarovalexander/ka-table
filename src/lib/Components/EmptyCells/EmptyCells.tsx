import * as React from 'react';

import EmptyCell from '../EmptyCell/EmptyCell';
import { IEmptyCellsProps } from '../../props';

const EmptyCells: React.FunctionComponent<IEmptyCellsProps> = (props) => {
  return (
    <>
      {[...Array(props.count)].map((item, index) => <EmptyCell {...props} index={index}/>)}
    </>
  );
};

export default EmptyCells;
