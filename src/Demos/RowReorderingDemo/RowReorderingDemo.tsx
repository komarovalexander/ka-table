import React from 'react';

import { DataType, Table } from '../../lib';
import { EditingMode } from '../../lib/enums';

const dataArray = Array(10).fill(undefined).map(
    (_, index) => ({
        column1: `column:1 row:${index}`,
        column2: `column:2 row:${index}`,
        column3: `column:3 row:${index}`,
        column4: `column:4 row:${index}`,
        id: index,
    }),
);

const RowReorderingDemo: React.FC = () => {
    return (
        <div className='rows-reordering-demo'>
            <Table
                columns= {[
                    { key: 'drag', width: 50, isEditable: false, title: '' },
                    { key: 'column1', title: 'Column 1', dataType: DataType.String },
                    { key: 'column2', title: 'Column 2', dataType: DataType.String },
                    { key: 'column3', title: 'Column 3', dataType: DataType.String },
                    { key: 'column4', title: 'Column 4', dataType: DataType.String },
                ]}
                data={dataArray}
                editingMode={EditingMode.Cell}
                rowKeyField={'id'}
                rowReordering={true}
                childComponents={{
                    cell: {
                        content: (props) => {
                            switch (props.column.key){
                            case 'drag': return <img style={{cursor: 'move'}} src='static/icons/draggable.svg' alt='draggable' />;
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default RowReorderingDemo;
