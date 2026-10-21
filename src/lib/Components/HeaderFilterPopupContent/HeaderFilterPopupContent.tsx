import * as React from 'react';

import { ActionType, FilteringMode, Table, useTable, } from '../..';
import { updateHeaderFilterSearchValue, updateHeaderFilterValues } from '../../actionCreators';

import CellEditorBoolean from '../CellEditorBoolean/CellEditorBoolean';
import { IHeaderFilterPopupProps } from '../../props';
import { getValueByColumn } from '../../Utils/DataUtils';

type HeaderFilterItem = { value: string; isSelected: boolean; };

const HeaderFilterPopupContent: React.FC<IHeaderFilterPopupProps> = (props) => {
    const {
        column,
        childComponents,
        data,
        dispatch,
        format
    } = props;
    let headerFilterValues: string[] | undefined;
    headerFilterValues = column?.headerFilterListItems ? column?.headerFilterListItems({ data }) : data?.map((item) => {
        const value = getValueByColumn(item, column);

        const formattedValue =
            (format && format({ column, value, rowData: item }))
            || value?.toString();
        return formattedValue;
    });
    headerFilterValues = Array.from(new Set(headerFilterValues));
    const headerFilterValuesData: HeaderFilterItem[] = headerFilterValues?.map((value) => ({ value, isSelected: !!column.headerFilterValues && column.headerFilterValues.includes(value) }));
    const selectedColumnKey = `${column.key}_isSelected`;
    const table = useTable({
        onDispatch: (action) => {
            if (action.type === ActionType.UpdateFilterRowValue) {
                dispatch(updateHeaderFilterSearchValue(action.columnKey, action.filterRowValue));
            }
        }
    });
    return (
        <Table
            table={table}
            columns={[
                { key: selectedColumnKey, field: 'isSelected', width: 35, isFilterable: false },
                {
                    key: column.key,
                    field: 'value',
                    // the header is hidden, the title names the search input
                    title: column.title,
                    style: { textAlign: 'left' },
                    filterRowValue: column.headerFilterSearchValue
                }]}
            filteringMode={column.isHeaderFilterSearchable ? FilteringMode.FilterRow : undefined}
            data={headerFilterValuesData}
            selectedRows={column.headerFilterValues}
            filter={() => column.headerFilterSearch}
            rowKeyField={'value'}
            // the checkboxes of the values get the focus by Tab in the popup
            keyboardNavigation={false}
            childComponents={{
                headRow: {
                    elementAttributes: () => ({ style: { display: 'none' } })
                },
                headCell: {
                    // the id (the column key) is already used by the header cell of the table
                    elementAttributes: () => ({ id: undefined })
                },
                filterRowCell: {
                    elementAttributes: ({ column: filterRowColumn }) => ({
                        style: {
                            top: 0,
                            display: filterRowColumn.key === selectedColumnKey ? 'none' : undefined
                        },
                        colSpan: filterRowColumn.key === selectedColumnKey ? 0 : 2
                    })
                },
                filterRowCellInput: childComponents?.headerFilterPopupSearchInput,
                rootDiv: {
                    elementAttributes: () => ({
                        className: 'ka-header-filter-table'
                    })
                },
                dataRow: childComponents?.headerFilterPopupRow,
                cell: {
                    ...childComponents?.headerFilterPopupTextCell,
                    elementAttributes: (componentProps) => ({
                        onClick: () => {
                            const isSelect = !column?.headerFilterValues?.includes(componentProps?.rowKeyValue);
                            dispatch(updateHeaderFilterValues(column.key, componentProps?.rowKeyValue, isSelect));
                        },
                        ...childComponents?.headerFilterPopupTextCell?.elementAttributes?.(componentProps)
                    }),
                },
                cellEditorInput: {
                    elementAttributes: ({ rowData }) => ({ 'aria-label': rowData?.value }),
                },
                cellText: {
                    content: (componentProps) => {
                        switch (componentProps?.column.key) {
                        case selectedColumnKey: return <CellEditorBoolean {...componentProps} />;
                        }
                    },
                },

            }} />
    )
}

export default HeaderFilterPopupContent;
