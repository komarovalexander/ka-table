import React from 'react';

import { IRowProps } from '../../props';
import DataRow from '../DataRow/DataRow';
import DetailsRow from '../DetailsRow/DetailsRow';

const DataAndDetailsRows: React.FunctionComponent<IRowProps> = (props) => {
  const { isDetailsRowShown } = props;
  return (
    <>
      <DataRow {...props}/>
      {isDetailsRowShown && <DetailsRow {...props}/>}
    </>
  );
};

export default DataAndDetailsRows;
