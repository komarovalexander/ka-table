import * as React from 'react';

import { DataType, FilteringMode, SortDirection, Table, useTable, useTableInstance } from '../..';
import { ICellTextProps, IHeaderFilterPopupProps } from '../../props';

import { getValueByColumn } from '../../Utils/DataUtils';

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

    if (column?.headerFilterListItems) {
        headerFilterValues = column?.headerFilterListItems({ data, column });
    } else {
        headerFilterValues = data?.map((item, i) => {
            const value = getValueByColumn(item, column);

            const formattedValue =
                (format && format({ column, value, rowData: item }))
                || value?.toString();
            return formattedValue;
        });
        headerFilterValues = Array.from(new Set(headerFilterValues));
        headerFilterValues = headerFilterValues?.map((v, i) => ({ [column.key]: v, rowKeyValue: i }));
    }

    const table = useTable({
        onDispatch: (action) => {
            console.log(action)
        }
    });
    return (
        <Table
            table={table}
            columns={[
                { key: 'selection-cell', width: 50, isFilterable: false },
                {
                    key: column.key, dataType: column?.headerFilterListItems ? DataType.String : column.dataType, style: { textAlign: 'left' }
                }]}
            filteringMode={column.isHeaderFilterSearchable ? FilteringMode.FilterRow : undefined}
            format={column?.headerFilterListItems ? undefined : format}
            data={headerFilterValues}
            filter={() => column.headerFilterSearch}
            rowKeyField={column.headerFilterRowKeyField ? column.headerFilterRowKeyField : 'rowKeyValue'}
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
