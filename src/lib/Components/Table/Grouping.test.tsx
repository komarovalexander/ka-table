import * as React from 'react';

import { DataType } from '../../enums';
import { Table } from '../..';
import { render } from '@testing-library/react';

describe('grouping', () => {
    it('groups by a date column with the format of its cells', () => {
        const columns = [{ key: 'date', title: 'Date', dataType: DataType.Date }, { key: 'name', title: 'Name' }];
        const data = [
            { id: 1, date: new Date(2021, 10, 8), name: 'a' },
            { id: 2, date: new Date(2021, 10, 8), name: 'b' },
            { id: 3, date: new Date(2021, 10, 9), name: 'c' },
        ];
        const { container } = render(
            <Table
                columns={columns}
                data={data}
                rowKeyField='id'
                groups={[{ columnKey: 'date' }]}
                // the format of the demos which works only with dates
                format={({ column, value }) => (column.dataType === DataType.Date ? value && value.toLocaleDateString('en-US') : undefined)}
            />
        );
        expect(Array.from(container.querySelectorAll('.ka-group-row')).map((row) => row.textContent)).toEqual(['11/8/2021', '11/9/2021']);
    });
});
