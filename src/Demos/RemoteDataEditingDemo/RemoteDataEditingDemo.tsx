import React from 'react';

import { DataType, Table, useTable } from '../../lib';
import { loadData } from '../../lib/actionCreators';
import { ActionType, EditingMode, SortingMode } from '../../lib/enums';
import { DeleteRow } from './components';
import serverEmulator from './serverEmulator';

const RemoteDataEditingDemo: React.FC = () => {
  const table = useTable({
    onDispatch: async (action) => {
      if (action.type === ActionType.DeleteRow) {
        table.showLoading();
        await serverEmulator.delete(action.rowKeyValue);
        table.setSingleAction(loadData());
      } else if (action.type === ActionType.UpdateCellValue) {
        table.showLoading();
        await serverEmulator.update(action.rowKeyValue, { [action.columnKey]: action.value });
        table.setSingleAction(loadData());
      } else if (action.type === ActionType.UpdateSortDirection || action.type === ActionType.UpdatePageIndex) {
        table.setSingleAction(loadData());
      } else if (action.type === ActionType.LoadData) {
        table.showLoading();
        const result = await serverEmulator.get(table.props.paging, table.props.columns, action?.pageIndex);
        table.updatePagesCount(result.pagesCount);
        table.updateData(result.data);
        table.hideLoading();
      }
    }
  });

  return (
    <div className='remote-data-demo'>
      <Table
        table={table}
        columns= {[
          { key: 'column1', title: 'Column 1', dataType: DataType.String },
          { key: 'column2', title: 'Column 2', dataType: DataType.String },
          { key: 'column3', title: 'Column 3', dataType: DataType.String },
          { key: 'column4', title: 'Column 4', dataType: DataType.String },
          { key: ':delete', width: 70, style: { textAlign: 'center' }},
        ]}
        editingMode={EditingMode.Cell}
        loading= {{
          enabled: true
        }}
        singleAction={loadData()}
        paging= {{
          enabled: true,
          pageIndex: 0,
          pageSize: 10
        }}
        sortingMode={SortingMode.SingleTripleStateRemote}
        rowKeyField={'id'}
        childComponents={{
          cell: {
            content: (props) => {
              if (props.column.key === ':delete'){
                return <DeleteRow {...props} />
              }
            }
          }
        }}
      />
    </div>
  );
};

export default RemoteDataEditingDemo;
