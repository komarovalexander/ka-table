import * as React from 'react';

import { DataType, FilteringMode, Table, useTable, useTableInstance } from '../..';
import { ICellTextProps, IPopupContentProps } from '../../props';

import { getValueByColumn } from '../../Utils/DataUtils';
import { kaPropsUtils } from '../../utils';

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

const SelectionHeader = () => {
    const table = useTableInstance();
    const areAllRowsSelected = kaPropsUtils.areAllFilteredRowsSelected(table.props);

    return (
        <input
            type='checkbox'
            checked={areAllRowsSelected}
            onChange={(event) => {
                if (event.currentTarget.checked) {
                    table.selectAllFilteredRows(); // also available: selectAllVisibleRows(), selectAllRows()
                } else {
                    table.deselectAllFilteredRows(); // also available: deselectAllVisibleRows(), deselectAllRows()
                }
            }}
        />
    );
};

const PopupContent: React.FC<IPopupContentProps> = (props) => {
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
    }
    headerFilterValues = headerFilterValues?.map((v, i) => ({ [column.key]: v, rowKeyValue: i }));

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
            filteringMode={FilteringMode.FilterRow}
            format={column?.headerFilterListItems ? undefined : format}
            data={headerFilterValues}
            rowKeyField={'rowKeyValue'}
            childComponents={{
                headRow: {
                    elementAttributes:  () => ({style: { display: 'none'}})
                },
                filterRowCell: {
                    elementAttributes: () => ({style: { top: 0 }})
                },
                rootDiv: {
                    elementAttributes: () => ({
                        className: 'ka-header-filter-table'
                    })
                },
                cellText: {
                    content: (componentProps) => {
                        if (componentProps.column.key === 'selection-cell') {
                            return <SelectionCell {...componentProps} />;
                        }
                    },
                },
                headCell: {
                    content: (componentProps) => {
                        if (componentProps.column.key === 'selection-cell') {
                            return <SelectionHeader />;
                        }
                    },
                },
            }} />
    )
}

export default PopupContent;
