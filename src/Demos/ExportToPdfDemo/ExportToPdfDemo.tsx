import React from 'react';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DataType, Table, useTable } from '../../lib';
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

const ExportToPdfDemo: React.FC = () => {
    const table = useTable();
    const exportClick = (orientation?: any) => {
        const doc: any = new jsPDF(orientation);
        const head = [table.props.columns.map(c => c.title!)];
        const body = table.props.data!.map(d => table.props.columns.map(c => getValueByColumn(d, c)));

        autoTable(doc, {
            margin: 1,
            headStyles: { fillColor: '#F1F5F7', textColor: '#747D86' },
            alternateRowStyles: { fillColor: '#F9FBFC' },
            head,
            body,
        });

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
                table={table}
                columns= {[
                    { key: 'column1', title: 'Column 1', dataType: DataType.String },
                    { key: 'column2', title: 'Column 2', dataType: DataType.String },
                    { key: 'column3', title: 'Column 3', dataType: DataType.String },
                    { key: 'column4', title: 'Column 4', dataType: DataType.String },
                ]}
                virtualScrolling= {{
                    enabled: true
                }}
                data={dataArray}
                rowKeyField={'id'}
            />
        </div >
    );
};

export default ExportToPdfDemo;
