import './HoverRowDemo.scss';

import React, { useState } from 'react';

import { DataType, Table } from '../../lib';
import { ChildComponents } from '../../lib/models';
import dataArray from './data';

const ROW_MOUSE_ENTER = 'ROW_MOUSE_ENTER';
const ROW_MOUSE_LEAVE = 'ROW_MOUSE_LEAVE';

const childAttributes: ChildComponents = {
    dataRow: {
        elementAttributes: (props) => ({
            title: `${props.rowData.name} ${props.rowData.phoneNumber}`,
            onMouseEnter: (event, extendedEvent) => {
                const {
                    childProps: {
                        rowKeyValue,
                    },
                    dispatch,
                } = extendedEvent;
                dispatch({ type: ROW_MOUSE_ENTER, rowKeyValue });
            },
            onMouseLeave: (event, { dispatch }) => {
                dispatch({ type: ROW_MOUSE_LEAVE });
            },
        }),
    },
};

const HoverRowDemo: React.FC = () => {
    const [selectedItem] = useState<any>();
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
                childComponents={childAttributes}
            />
            { selectedItem && (
                <div className='info'>
          Hovered: {selectedItem.name} ({selectedItem.company.name})
                </div>
            )}
        </div>
    );
};

export default HoverRowDemo;
