import 'jspdf-autotable';

import jsPDF from 'jspdf';
import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';
import { getValueByColumn } from '../../lib/Utils/DataUtils';

const dataArray = Array(2000).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  virtualScrolling: {},
  data: dataArray,
  rowKeyField: 'id',
};

const ExportToPdfDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  const exportClick = (orientation?: any) => {
    const doc: any = new jsPDF(orientation);
    const head = [tableProps.columns.map(c => c.title)];
    const body = tableProps.data!.map(d => tableProps.columns.map(c => getValueByColumn(d, c)));
    doc.autoTable({
      margin: 1,
      headStyles: { fillColor: '#F1F5F7', textColor: '#747D86' },
      alternateRowStyles: { fillColor: '#F9FBFC' },
      head,
      body,
    })

    doc.save('table.pdf')
  }

  return (
    <div>
      <div style={{
        marginBottom: 20,
        marginLeft: 20
      }}>
        <button onClick={() => exportClick()}>Export to PDF</button>
        <button style={{marginLeft: 40}} onClick={() => exportClick('landscape')}>Export to PDF (Landscape)</button>
      </div>
      <Table
        {...tableProps}
        dispatch={dispatch}
        childComponents={{
          table: {
            elementAttributes: () => ({
              id: 'table-to-xls'
            })
          }
        }}
      />
    </div >
  );
};

export default ExportToPdfDemo;
