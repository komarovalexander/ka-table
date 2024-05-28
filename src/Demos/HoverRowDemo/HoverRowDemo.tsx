import './HoverRowDemo.scss';

import { DataType, Table } from '../../lib';
import React, { useState } from 'react';

import dataArray from './data';

const ROW_MOUSE_ENTER = 'ROW_MOUSE_ENTER';
const ROW_MOUSE_LEAVE = 'ROW_MOUSE_LEAVE';


const HoverRowDemo = () => {
    const [hoveredItem, setHoveredItem] = useState<typeof dataArray[number]>();
    return (
        <div className='hover-row-demo'>
            <Table
                columns= {[
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
                        elementAttributes: (props) => ({
                            title: `${props.rowData.name} ${props.rowData.phoneNumber}`,
                            onMouseEnter: (event, extendedEvent) => {
                                const {
                                    childProps: {
                                        rowData,
                                    },
                                } = extendedEvent;
                                setHoveredItem(rowData);
                            },
                            onMouseLeave: () => {
                                setHoveredItem(undefined);
                            },
                        }),
                    }
                }}
            />
            { hoveredItem && (
                <div className='info'>
          Hovered: {hoveredItem.name} ({hoveredItem.company.name})
                </div>
            )}
        </div>
    );
};

export default HoverRowDemo;
