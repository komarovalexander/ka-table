var e=`import { DataType, Table } from '../../lib';
import { EditingMode, SortingMode } from '../../lib/enums';

import { Column } from '../../lib/models';

const columns: Column[] = Array(500).fill(undefined).map(
    (_, index) => ({
        key: 'column' + index,
        width: 190,
        title: 'Column ' + index,
        dataType: DataType.String,
        // the first column stays at the left edge while the others are scrolled
        fixed: index === 0 ? 'left' : undefined,
    }),
);

let dataArray: Record<string, string | number>[];

// 2 000 rows of 500 columns (a million cells) are created when the demo is opened
const getDataArray = () => {
    if (!dataArray) {
        dataArray = Array(2000).fill(undefined).map(
            (_, index) => columns.reduce<Record<string, string | number>>((previousValue, currentValue) => {
                previousValue[currentValue.key] = \`\${currentValue.key} row:\${index}\`;
                return previousValue;
            }, { id: index }),
        );
    }
    return dataArray;
};

const ManyColumnsDemo = () => {
    return (
        <Table
            columns={columns}
            data={getDataArray()}
            editingMode={EditingMode.Cell}
            rowKeyField={'id'}
            sortingMode={SortingMode.Single}
            // only the visible rows and columns are rendered
            virtualScrolling={{ enabled: true, horizontal: true }}
            childComponents={{
                tableWrapper: {
                    elementAttributes: () => ({ style: { maxHeight: 600 } })
                }
            }}
        />
    );
};

export default ManyColumnsDemo;
`;export{e as default};