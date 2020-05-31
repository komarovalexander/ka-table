import React from 'react';

import DataRow, { IRowProps } from '../DataRow/DataRow';
import DetailsRow from '../DetailsRow/DetailsRow';

const DataAndDetailsRows: React.FunctionComponent<IRowProps> = (props) => {
  const { isDetailsRowShown, detailsRow } = props;
  return (
    <>
      <DataRow {...props}/>
      {isDetailsRowShown && detailsRow && <DetailsRow {...props}/>}
    </>
  );
};

export default DataAndDetailsRows;
