import './SelectionSingleDemo.scss';

import { DataType, Table, useTable } from 'ka-table';
import React, { useState } from 'react';

import dataArray from './data';

const SelectionSingleDemo = () => {
    const [selectedId, changeSelectedId] = useState<any>();
    const selectedData = selectedId && dataArray?.find(d => d.id === selectedId);
    const table = useTable({
        onDispatch: (action, tableProps) => {
            if (action.type === 'SelectSingleRow'){
                changeSelectedId(action.rowKeyValue);
            }
            if (action.type === 'DeselectAllRows'){
                changeSelectedId(undefined);
            }
        },
    });

    return (
        <div className='selection-single-demo'>
            <Table
                table={table}
                columns={[
                    {
                        dataType: DataType.String,
                        key: 'name',
                        title: 'Representative',
                    },
                    {
                        dataType: DataType.String,
                        key: 'phoneNumber',
                        title: 'Phone',
                    },
                    {
                        dataType: DataType.Boolean,
                        key: 'hasLoyalProgram',
                        title: 'Loyal Program',
                    },
                    {
                        dataType: DataType.String,
                        field: 'name',
                        key: 'company.name',
                        title: 'Company Name',
                    },
                ]}
                data={dataArray}
                rowKeyField={'id'}
                selectedRows={[selectedId]}
                childComponents={{
                    dataRow: {
                        elementAttributes: () => ({
                            onClick: (event, extendedEvent) => {
                                table.selectSingleRow(extendedEvent.childProps.rowKeyValue);
                            },
                        }),
                    },
                }}
            />
            {selectedData && (
                <div className='info'>
                    <div>
            Selected: {selectedData.name} ({selectedData.company.name})
                        <button
                            onClick={() => {
                                table.deselectAllRows();
                            }}
                        >
              Deselect
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectionSingleDemo;
