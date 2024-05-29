import * as React from 'react';

import { ActionType, DataType, FilteringMode, SortDirection, Table, useTable, useTableInstance } from '../..';
import { ICellTextProps, IHeaderFilterPopupProps } from '../../props';

import { getValueByColumn } from '../../Utils/DataUtils';
import { updateHeaderFilterValues } from '../../actionCreators';

const SelectionCell = ({ rowKeyValue, isSelectedRow, selectedRows }: ICellTextProps) => {
    const table = useTableInstance();
    return (
        <input
            type='checkbox'
            checked={isSelectedRow}
            onChange={(event: any) => {
                if (event.nativeEvent.shiftKey) {
                    table.selectRowsRange(rowKeyValue, [...selectedRows].pop());
                } else if (event.currentTarget.checked) {
                    table.selectRow(rowKeyValue);
                } else {
                    table.deselectRow(rowKeyValue);
                }
            }}
        />
    );
};

const PopupContent: React.FC<IHeaderFilterPopupProps> = (props) => {
    const {
        column,
        childComponents,
        data,
        dispatch,
        format
    } = props;
    let headerFilterValues: any[] | undefined;
    headerFilterValues = column?.headerFilterListItems ? column?.headerFilterListItems({ data, column }) : data?.map((item, i) => {
        const value = getValueByColumn(item, column);

        const formattedValue =
                (format && format({ column, value, rowData: item }))
                || value?.toString();
        return formattedValue;
    });
    headerFilterValues = Array.from(new Set(headerFilterValues));
    headerFilterValues = headerFilterValues?.map((value, i) => ({ value }));
    const table = useTable({
        onDispatch: (action) => {
            if (action.type === ActionType.SelectRow){
                dispatch(updateHeaderFilterValues(column.key, action.rowKeyValue, true))
            }
            if (action.type === ActionType.DeselectRow){
                dispatch(updateHeaderFilterValues(column.key, action.rowKeyValue, false))
            }
        }
    });
    return (
        <Table
            table={table}
            columns={[
                { key: 'selection-cell', width: 35, isFilterable: false },
                {
                    key: 'value', style: { textAlign: 'left' }
                }]}
            filteringMode={column.isHeaderFilterSearchable ? FilteringMode.FilterRow : undefined}
            format={column?.headerFilterListItems ? undefined : format}
            data={headerFilterValues}
            selectedRows={column.headerFilterValues}
            filter={() => column.headerFilterSearch}
            rowKeyField={'value'}
            childComponents={{
                headRow: {
                    elementAttributes:  () => ({style: { display: 'none'}})
                },
                filterRowCell: {
                    elementAttributes: ({ column: filterRowColumn }) => ({style: { top: 0, display: filterRowColumn.key === 'selection-cell' ? 'none' : undefined }, colSpan: filterRowColumn.key === 'selection-cell' ? 0 : 2})
                },
                filterRowCellInput: {
                    elementAttributes: () => ({ style: { width: '100%', boxSizing: 'border-box' }})
                },
                rootDiv: {
                    elementAttributes: () => ({
                        className: 'ka-header-filter-table'
                    })
                },
                cellText: {
                    elementAttributes: (componentProps) => componentProps?.column.key === column.key ? childComponents?.headerFilterContentCellText?.elementAttributes?.(componentProps) : undefined,
                    content: (componentProps) => {
                        if (componentProps.column.key === 'selection-cell') {
                            return <SelectionCell {...componentProps} />;
                        }
                        if (componentProps?.column.key === column.key){
                            return childComponents?.headerFilterContentCellText?.content?.(componentProps);
                        }
                    },
                },
            }} />
    )
}

export default PopupContent;
