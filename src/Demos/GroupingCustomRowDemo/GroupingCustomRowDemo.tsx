import { DataType, Table } from '../../lib';

import EmptyCells from '../../lib/Components/EmptyCells/EmptyCells';
import { IGroupRowProps } from '../../lib/props';
import React from 'react';
import { updateGroupsExpanded } from '../../lib/actionCreators';

const dataArray = [
    { id: 1, type: 'Cat', name: 'Kas', country: 'Czech Republic', age: 2 },
    { id: 2, type: 'Dog', name: 'Rex', country: 'Montenegro', age: 6 },
    { id: 3, type: 'Cat', name: 'Simba', country: 'France', age: 12 },
    { id: 4, type: 'Dog', name: 'Beethoven', country: 'Czech Republic', age: 3 },
    { id: 5, type: 'Cat', name: 'Hash', country: 'Czech Republic', age: 8 },
];

const GroupRow: React.FunctionComponent<IGroupRowProps> = ({
    contentColSpan,
    groupIndex,
    isExpanded,
    dispatch,
    text,
    groupKey,
}) => (
    <>
        <EmptyCells count={groupIndex}/>
        <td className='ka-group-cell' colSpan={contentColSpan}>
            <button
                onClick={() => dispatch(updateGroupsExpanded(groupKey))}
                style={{marginRight: 5}}>{isExpanded ? 'Hide Group Items' : 'Show Group Items'}</button>
            {text}
        </td>
    </>
);

const GroupingCustomRowDemo = () => {
    return (
        <Table
            columns= {[
                {
                    dataType: DataType.String,
                    key: 'type',
                    title: 'TYPE',
                },
                {
                    dataType: DataType.String,
                    key: 'name',
                    title: 'NAME',
                },
                {
                    dataType: DataType.String,
                    key: 'country',
                    title: 'COUNTRY',
                },
                {
                    dataType: DataType.Number,
                    key: 'age',
                    width: '50%',
                    title: 'AGE',
                },
            ]}
            data={dataArray}
            groups={[{ columnKey: 'country' }, { columnKey: 'type' }]}
            rowKeyField={'id'}
            childComponents={{
                groupRow: {
                    content: GroupRow
                }
            }}
        />
    );
};

export default GroupingCustomRowDemo;
