import './CustomCellDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, EditingMode, Events } from '../../lib/enums';
import { Cell } from '../../lib/models';
import { CellFuncPropsWithChildren, OptionChangedFunc } from '../../lib/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true, img: 'static/images/man1.PNG' },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2019, 10, 8, 10), img: 'static/images/man2.PNG' },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2019, 11, 8, 10), img: 'static/images/man3.PNG' },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true, img: 'static/images/man4.PNG' },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true, img: 'static/images/man5.PNG'  },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2019, 10, 9, 10), img: 'static/images/man6.PNG'  },
];

const CustomCell: React.FC<CellFuncPropsWithChildren> = ({
  column: { key }, field, rowData, rowKeyField, dispatch,
}) => {
  return (
    <div onClick={() => {
      const cell: Cell = { columnKey: key, rowKey: rowData[rowKeyField] };
      dispatch(Events.OpenEditor, { cell });
    }}>
      {rowData[field] ? 'Passed' : 'Failed'}
    </div>
  );
};

const CustomImageCell: React.FC<CellFuncPropsWithChildren> = ({
  field, rowData,
}) => {
  return (
    <div>
      <img className='custom-cell-image' src={rowData[field]} alt=''/>
    </div>
  );
};

const tableOption: ITableOption = {
  columns: [
    {
      cell: CustomImageCell,
      dataType: DataType.String,
      key: 'img',
      style: { width: '11%' },
      title: 'Image',
    },
    { dataType: DataType.String, key: 'name', title: 'Name', style: { width: '30%' } },
    { key: 'score', title: 'Score', dataType: DataType.Number, style: { width: '10%', textAlign: 'right' } },
    {
      cell: CustomCell,
      dataType: DataType.Boolean,
      key: 'passed',
      style: { width: '30%', textAlign: 'center' },
      title: 'Results',
    },
    {
      dataType: DataType.Date,
      format: (value: Date) => value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      key: 'nextTry',
      title: 'Next Try',
    },
  ],
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
};

const CustomCellDemo: React.FC = () => {
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

export default CustomCellDemo;
