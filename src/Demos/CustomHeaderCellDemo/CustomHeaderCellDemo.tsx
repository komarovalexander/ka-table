import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType } from '../../lib/enums';
import { HeaderCellFuncPropsWithChildren, OptionChangeFunc } from '../../lib/types';

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
    {
      dataType: DataType.String,
      headCell: (props) => <HeadCell {...props}/>,
      key: 'column1',
      style: { textAlign: 'left' },
      title: 'Column 1',
    },
    {
      dataType: DataType.String,
      key: 'column2',
      title: 'Column 2',
    },
  ],
  rowKeyField: 'id',
};

const CustomHeaderCellDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChange: OptionChangeFunc = (value) => {
    changeOptions({...option, ...value });
  };

  return (
    <Table
      {...option}
      data={dataArray}
      onOptionChange={onOptionChange}
    />
  );
};

export default CustomHeaderCellDemo;
