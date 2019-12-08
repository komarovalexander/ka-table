import React, { useState } from 'react';

import { ITableOption, Table } from 'react-table-control';
import { TextAlign } from 'react-table-control/enums';
import { HeaderCellFuncPropsWithChildren, OptionChangedFunc } from 'react-table-control/types';

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
    { key: 'column1', title: 'Column 1', headCell: (props) => <HeadCell {...props}/>, textAlign: TextAlign.Left },
    { key: 'column2', title: 'Column 2' },
  ],
  rowKeyField: 'id',
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
