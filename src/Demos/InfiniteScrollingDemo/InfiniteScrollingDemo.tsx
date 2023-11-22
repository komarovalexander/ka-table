import { DataType, Table, useTable } from '../../lib';
import React, { useState } from 'react';

import serverEmulator from './serverEmulator';

const LOAD_MORE_DATA = 'LOAD_MORE_DATA';

const InfiniteScrollingDemo: React.FC = () => {
    const [pageIndex, changePageIndex] = useState(0);
    const [data, changeData] = useState<any[]>([]);

    const table = useTable({
        onDispatch: async (action) => {
            if (pageIndex !== -1) {
                if (action.type === LOAD_MORE_DATA) {
                    table.showLoading();
                    const result = await serverEmulator.get(pageIndex);
                    changePageIndex(result.pageIndex);
                    table.hideLoading();
                    changeData([...data, ...result.data]);
                }
            }
        },
    });

    return (
        <Table
            table={table}
            columns={[
                { key: 'column1', title: 'Column 1', dataType: DataType.String },
                { key: 'column2', title: 'Column 2', dataType: DataType.String },
                { key: 'column3', title: 'Column 3', dataType: DataType.String },
                { key: 'column4', title: 'Column 4', dataType: DataType.String },
            ]}
            data={data}
            rowKeyField={'id'}
            virtualScrolling={{
                enabled: true,
            }}
            singleAction={{ type: LOAD_MORE_DATA }}
            childComponents={{
                tableWrapper: {
                    elementAttributes: () => ({
                        onScroll: (event, { baseFunc, dispatch }) => {
                            baseFunc(event);
                            const element = event.currentTarget;
                            const BOTTOM_OFFSET = 20;
                            if (element.offsetHeight + element.scrollTop >= element.scrollHeight - BOTTOM_OFFSET) {
                                dispatch({ type: LOAD_MORE_DATA });
                            }
                        },
                        style: { maxHeight: 600 },
                    }),
                },
            }}
        />
    );
};

export default InfiniteScrollingDemo;
