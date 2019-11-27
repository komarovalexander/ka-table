import './CustomCellDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, EditingMode, Events, TextAlign } from '../../lib/enums';
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
  column: { key }, field, rowData, rowKeyField, onEvent,
}) => {
  return (
    <div onClick={() => {
      const cell: Cell = { columnKey: key, rowKey: rowData[rowKeyField] };
      onEvent(Events.OpenEditor, { cell });
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
      title: 'Image',
      width: '10%',
    },
    { dataType: DataType.String, key: 'name', title: 'Name', width: '30%' },
    { key: 'score', title: 'Score', dataType: DataType.Number, width: '10%', textAlign: TextAlign.Right },
    {
      cell: CustomCell,
      dataType: DataType.Boolean,
      key: 'passed',
      textAlign: TextAlign.Right,
      title: 'Results',
      width: '10%',
    },
    { key: 'nextTry', title: 'Next Try', dataType: DataType.Date, textAlign: TextAlign.Right  },
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
