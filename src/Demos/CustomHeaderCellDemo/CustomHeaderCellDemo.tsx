import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { TextAlign } from '../../lib/enums';
import { HeaderCellFuncPropsWithChildren, OptionChangedFunc } from '../../lib/types';

const dataArray = Array(7).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    id: index,
  }),
);

const HeadCell: React.FC<HeaderCellFuncPropsWithChildren> = ({
  column: { title },
}) => {
  return (
    <div style={{color: 'red'}}>
      {title} - (Custom)
    </div>
  );
};

const tableOption: ITableOption = {
  columns: [
    { field: 'column1', title: 'Column 1', headCell: (props) => <HeadCell {...props}/>, textAlign: TextAlign.Left },
    { field: 'column2', title: 'Column 2' },
  ],
  rowKey: 'id',
};

const CustomHeaderCellDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChanged: OptionChangedFunc = (value) => {
    changeOptions({...option, ...value });
  };

  const [data, changeData] = useState(dataArray);
  const onDataChanged: OptionChangedFunc = (newValue) => {
    changeData(newValue);
  };
  return (
    <Table
      {...option}
      data={data}
      onOptionChanged={onOptionChanged}
      onDataChanged={onDataChanged}
    />
  );
};

export default CustomHeaderCellDemo;
