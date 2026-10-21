import './SelectionSingleDemo.scss';

import { DataType, Table, useTable, useTableSelector } from '../../lib';

import React from 'react';

import dataArray from './data';

const SelectionSingleDemo = () => {
    const table = useTable();
    // the component re-renders only when the selected row changes
    const selectedId = useTableSelector(table, (props) => props.selectedRows?.[0]);
    const selectedData = selectedId && dataArray.find(d => d.id === selectedId);

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
