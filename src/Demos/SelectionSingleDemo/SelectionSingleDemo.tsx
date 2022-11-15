import './SelectionSingleDemo.scss';

import React, { useState } from 'react';

import { DataType, Table, useTable } from '../../lib';
import { kaPropsUtils } from '../../lib/utils';
import dataArray from './data';

const SelectionSingleDemo: React.FC = () => {
  const [selectedData, changeSelectedData] = useState<any>();
  const table = useTable({
    onDispatch: (action, tableProps) => {
      const selectedData = kaPropsUtils.getSelectedData(tableProps).pop();
      changeSelectedData(selectedData);
    }
  });
  
  return (
    <div className='selection-single-demo'>
      <Table
         table={table}
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
            elementAttributes: () => ({
              onClick: (event, extendedEvent) => {
                table.selectSingleRow(extendedEvent.childProps.rowKeyValue);
              },
            })
          },
        }}
      />
      { selectedData && (
        <div className='info'>
          <div>
            Selected: {selectedData.name} ({selectedData.company.name})
            <button onClick={() => {
              table.deselectAllRows();
            }}>Deselect</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectionSingleDemo;
