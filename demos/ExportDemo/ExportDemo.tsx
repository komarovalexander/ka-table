import { CSVLink } from 'react-csv';
import { DataType } from 'ka-table/enums';
import React from 'react';
import { Table } from 'ka-table';

const dataArray = Array(7).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const ExportDemo: React.FC = () => {
  const data = dataArray;
  const columns = [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ];

  return (
    <div>
      <div style={{
        marginBottom: 20,
        marginLeft: 20
      }}>
        <CSVLink
          data={dataArray}
          headers={columns.map(c => ({ label: c.title!, key: c.key! }))}
          filename='ka-table.data.csv'
          enclosingCharacter={''}
          separator={';'}>
          Download .csv
        </CSVLink>
      </div>
      <Table
        columns={columns}
        data={data}
        rowKeyField={'id'}
      />
    </div>
  );
};

export default ExportDemo;
