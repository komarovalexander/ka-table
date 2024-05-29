import * as React from 'react';

import { FilteringMode, Table, } from '../..';

import CellEditorBoolean from '../CellEditorBoolean/CellEditorBoolean';
import { IHeaderFilterPopupProps } from '../../props';
import { getValueByColumn } from '../../Utils/DataUtils';
import { updateHeaderFilterValues } from '../../actionCreators';

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
    headerFilterValues = headerFilterValues?.map((value, i) => ({ value, isSelected: !!column.headerFilterValues && column.headerFilterValues.includes(value) }));
    return (
        <Table
            columns={[
                { key: 'isSelected', width: 35, isFilterable: false },
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
                    elementAttributes: ({ column: filterRowColumn }) => ({style: { top: 0, display: filterRowColumn.key === 'isSelected' ? 'none' : undefined }, colSpan: filterRowColumn.key === 'isSelected' ? 0 : 2})
                },
                filterRowCellInput: {
                    elementAttributes: () => ({ style: { width: '100%', boxSizing: 'border-box' }})
                },
                rootDiv: {
                    elementAttributes: () => ({
                        className: 'ka-header-filter-table'
                    })
                },
                cell: {
                    elementAttributes:  (componentProps) => ({
                        onClick: () => {
                            const isSelect = !column?.headerFilterValues?.includes(componentProps?.rowKeyValue);
                            dispatch(updateHeaderFilterValues(column.key, componentProps?.rowKeyValue, isSelect));
                        }
                    })
                },
                cellText: {
                    content: (componentProps) => {
                        switch (componentProps?.column.key){
                        case 'isSelected': return <CellEditorBoolean {...componentProps}/>;
                        }
                    }
                },

            }} />
    )
}

export default PopupContent;
