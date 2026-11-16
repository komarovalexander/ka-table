import {
    convertToFlat,
    getEnabledGroups,
    getExpandedGroups,
    getGroupKeyId,
    getGroupMark,
    getGroupText,
    getGroupedAndVisibleColumns,
    getGroupedData,
    getGroupedStructure,
    groupBy,
    groupDataMark,
    groupSummaryMark,
    isGroupRow,
    isGroupSummaryRow,
    isMaxDeep,
    normalizeKeyForMap,
    updateExpandedGroups,
} from './GroupUtils';

import { Group } from '../Models/Group';
import { GroupRowData } from '../Models/GroupRowData';

describe('GroupUtils', () => {
    const groupedColumns = [{key: 'country'}, {key: 'type'}];
    const data = [
        { type: 'Cat', name: 'Kas', country: 'Czech Republic' },
        { type: 'Dog', name: 'Rex', country: 'Montenegro' },
        { type: 'Cat', name: 'Simba', country: 'France' },
        { type: 'Dog', name: 'Beethoven', country: 'Czech Republic' },
        { type: 'Cat', name: 'Hash', country: 'Czech Republic' },
    ];
    const groups: Group[] = [{ columnKey: 'country' }, { columnKey: 'type' }];

    describe('convertToFlat', () => {
        it('simple', () => {
            const mappedData = new Map([['France', [{
                country: 'France',
                name: 'Simba',
                type: 'Cat',
            }]]]);
            const result = convertToFlat(mappedData);
            expect(result).toMatchSnapshot();
        });


        it('simple - group items', () => {
            // value is empty in case of collapsed group
            const value = Object.assign([], {
                groupDataMark,
                groupData: [{
                    country: 'France',
                    name: 'Simba',
                    type: 'Cat',
                }],
            });
            const mappedData = new Map([['France', value]]);
            const result = convertToFlat(mappedData);
            expect(result).toMatchSnapshot();
        });

        it('inner group', () => {
            const mappedData = new Map([['France',
                new Map([['Cat', [{
                    country: 'France',
                    name: 'Simba',
                    type: 'Cat',
                }]]]),
            ]]);
            const result = convertToFlat(mappedData);
            expect(result).toMatchSnapshot();
        });
        it('inner group with summart', () => {
            const mappedData = new Map([['France',
                new Map([
                    ['Cat', [{
                        country: 'France',
                        name: 'Simba',
                        type: 'Cat',
                    },
                    {
                        groupData: [
                            {
                                country: 'France',
                                name: 'Simba',
                                type: 'Cat',
                            }
                        ],
                        groupIndex: 0,
                        groupSummaryMark,
                        key: getGroupKeyId([['France', 'Cat'], '--:+summary--']),
                    },
                    ]],
                    [groupSummaryMark,
                        {
                            groupData: [
                                {
                                    country: 'France',
                                    name: 'Simba',
                                    type: 'Cat',
                                }
                            ],
                            groupIndex: 0,
                            groupSummaryMark,
                            key: getGroupKeyId([['France', 'Cat'], '--:+summary--']),
                        }]
                ]),
            ]]);
            const result = convertToFlat(mappedData);
            expect(result).toMatchSnapshot();
        });

        it('complex structure', () => {
            const mappedData = new Map([['France',
                new Map([
                    ['Cat', [{
                        country: 'France',
                        name: 'Simba',
                        type: 'Cat',
                    }, {
                        country: 'France',
                        name: 'Kas',
                        type: 'Cat',
                    }]],
                    ['Dog', [{
                        country: 'France',
                        name: 'Slimu',
                        type: 'Dog',
                    }, {
                        country: 'France',
                        name: 'Rex',
                        type: 'Dog',
                    }]],
                ]),
            ],
            ['Brazil',
                new Map([
                    ['Cat', [{
                        country: 'Brazil',
                        name: 'Simba',
                        type: 'Cat',
                    }, {
                        country: 'Brazil',
                        name: 'Kas',
                        type: 'Cat',
                    }]],
                    ['Dog', [{
                        country: 'Brazil',
                        name: 'Slimu',
                        type: 'Dog',
                    }, {
                        country: 'Brazil',
                        name: 'Rex',
                        type: 'Dog',
                    }]],
                ]),
            ]]);
            const result = convertToFlat(mappedData);
            expect(result).toMatchSnapshot();
        });
    });

    it('getExpandedGroups', () => {
        const groupRowData: GroupRowData = { key: ['dog'], value: 'Rex', groupMark: getGroupMark() };
        const groupedData: unknown[] = [{}, groupRowData, {}];
        const result = getExpandedGroups(groupedData);
        expect(result).toEqual([['dog']]);
    });

    it('updateExpandedGroups add', () => {
        const groupsExpanded: unknown[][] = [['cat']];
        const updated = updateExpandedGroups(groupsExpanded, ['dog']);
        expect(updated).toEqual([['cat'], ['dog']]);
    });

    it('updateExpandedGroups remove', () => {
        const groupsExpanded: unknown[][] = [['cat']];
        const updated = updateExpandedGroups(groupsExpanded, ['cat']);
        expect(updated).toEqual([]);
    });

    it('groupBy', () => {
        const result = groupBy(data, (item) => item.type);
        expect(result).toMatchSnapshot();
    });

    it('groupBy empty', () => {
        const result = groupBy(data, (item) => item.type, true);
        expect(result).toMatchSnapshot();
    });

    describe('getGroupedStructure', () => {
        it('basic', () => {
            const result = getGroupedStructure({ data, groups, groupedColumns});
            expect(result).toMatchSnapshot();
        });

        it('expanded root', () => {
            const result = getGroupedStructure({ data, groups, groupedColumns, expandedDeep: 0, groupsExpanded: [['Czech Republic']]});
            expect(result).toMatchSnapshot();
        });
        it('expanded second', () => {
            const result = getGroupedStructure({data, groups, groupedColumns, expandedDeep: 0, groupsExpanded: [['Czech Republic'], ['Czech Republic', 'Cat']]});
            expect(result).toMatchSnapshot();
        });
        it('should not expand second', () => {
            const result = getGroupedStructure({data, groups, groupedColumns, expandedDeep: 0, groupsExpanded: [['Czech Republic', 'Cat']]});
            expect(result).toMatchSnapshot();
        });
        it('expanded couple', () => {
            const result = getGroupedStructure({data, groups, groupedColumns, expandedDeep: 0, groupsExpanded:
                [['Czech Republic'], ['Czech Republic', 'Cat'], ['Montenegro']]});
            expect(result).toMatchSnapshot();
        });
        it('expanded couple (skip Czech Republic)', () => {
            const result = getGroupedStructure({data, groups, groupedColumns, expandedDeep: 0, groupsExpanded:  [['Czech Republic', 'Cat'], ['Montenegro']]});
            expect(result).toMatchSnapshot();
        });
        it('groupedColumns are empty', () => {
            const result = getGroupedStructure({data, groups, groupedColumns: [], expandedDeep: 0, groupsExpanded:  [['Czech Republic', 'Cat'], ['Montenegro']]});
            expect(result).toBeUndefined();
        });
        it('returns summary', () => {
            const groupsWithSummary: Group[] = [{ columnKey: 'country', enableSummary: true }, { columnKey: 'type', enableSummary: true }];
            const result = getGroupedStructure({data, groups: groupsWithSummary, groupedColumns, expandedDeep: 0});
            expect(result).toMatchSnapshot();
        });
    });

    describe('getGroupText', () => {
        it('default', () => {
            const result = getGroupText('Group Text', { key: 'column1', title: 'Column Title' });
            expect(result).toEqual('Column Title: Group Text');
        });
        it('column.title is not set', () => {
            const result = getGroupText(
                'Group Text',
                { key: 'column1'}
            );
            expect(result).toEqual('Group Text');
        });
        it('format', () => {
            const result = getGroupText(
                'Group Text',
                { key: 'column1', title: 'Column Title' },
                ({column, value}) => `Column: ${column.title}, Value: ${value}`
            );
            expect(result).toEqual('Column: Column Title, Value: Group Text');
        });
        it('format does not return value', () => {
            const result = getGroupText(
                'Group Text',
                { key: 'column1', title: 'Column Title' },
                () => undefined
            );
            expect(result).toEqual('Column Title: Group Text');
        });
        it('format gets the value of the rows: the key of a group of dates is a string', () => {
            const date = new Date(2021, 10, 8);
            const result = getGroupText(
                normalizeKeyForMap(date),
                { key: 'date', title: 'Date' },
                ({ value }) => (value as Date).toLocaleDateString('en-US'),
                [{ date }, { date: new Date(2021, 10, 8) }],
            );
            expect(result).toEqual('11/8/2021');
        });
        it('format gets the value of the rows: the key of a group of objects is a string', () => {
            const result = getGroupText(
                normalizeKeyForMap({ name: 'a' }),
                { key: 'owner', title: 'Owner' },
                ({ value }) => (value as { name: string }).name,
                [{ owner: { name: 'a' } }],
            );
            expect(result).toEqual('a');
        });
        it('the text of a format which does not format the value', () => {
            expect(getGroupText('a', { key: 'type', title: 'Type' }, () => false)).toEqual('Type: a');
            expect(getGroupText('a', { key: 'type', title: 'Type' }, () => '')).toEqual('');
        });
        it('format - groupItems', () => {
            const result = getGroupText(
                'Group Text',
                { key: 'column1', title: 'Column Title' },
                ({column, value, rowData }) => `Column: ${column.title}, Value: ${value}, rowData: ${JSON.stringify(rowData)}`,
                [{ id: 'hello'}, {id: 'im robot'}],
            );
            expect(result).toEqual('Column: Column Title, Value: Group Text, rowData: {"id":"hello"}');
        });
    });

    describe('a group with a summary', () => {
        it('has the rows in groupItems, the summary row follows them', () => {
            const rows = [{ id: 1, type: 'cat' }, { id: 2, type: 'cat' }];
            const result = getGroupedData(rows, [{ columnKey: 'type', enableSummary: true }], [{ key: 'type' }]);
            expect(result.map((item) => (isGroupRow(item) ? 'group' : isGroupSummaryRow(item) ? 'summary' : item.id)))
                .toEqual(['group', 1, 2, 'summary']);
            const [groupRow, , , summaryRow] = result;
            expect(isGroupRow(groupRow) && groupRow.groupItems).toEqual(rows);
            expect(isGroupSummaryRow(summaryRow) && summaryRow.groupData).toEqual(rows);
        });
    });

    describe('the keys of the groups', () => {
        it('getGroupKeyId is different for null, undefined, NaN and Infinity', () => {
            const keys = [[null], [undefined], [NaN], [Infinity], [-Infinity], ['null'], [null, undefined], [undefined, null]];
            expect(new Set(keys.map((key) => getGroupKeyId(key))).size).toBe(keys.length);
        });
        it('updateExpandedGroups removes the group of the key only', () => {
            expect(updateExpandedGroups([[null], [undefined]], [undefined])).toEqual([[null]]);
        });
        it('the group of NaN is expanded', () => {
            const rows = [{ id: 1, n: NaN }, { id: 2, n: 1 }];
            const result = getGroupedData(rows, [{ columnKey: 'n' }], [{ key: 'n' }], [[NaN]]);
            expect(result.map((item) => (isGroupRow(item) ? `group ${item.value}` : isGroupSummaryRow(item) ? 'summary' : item.id))).toEqual(['group NaN', 1, 'group 1']);
        });
    });

    describe('the disabled groups', () => {
        const disabledGroup: Group = { columnKey: 'type', enabled: false };
        it('getEnabledGroups', () => {
            const enabledGroups: Group[] = [{ columnKey: 'name' }];
            expect(getEnabledGroups([...enabledGroups, disabledGroup])).toEqual(enabledGroups);
            expect(getEnabledGroups(enabledGroups)).toBe(enabledGroups);
            expect(getEnabledGroups([disabledGroup])).toBeUndefined();
            expect(getEnabledGroups([])).toBeUndefined();
        });
        it('do not group the rows', () => {
            const rows = [{ id: 1, type: 'a' }];
            expect(getGroupedData(rows, [disabledGroup], [{ key: 'type' }])).toEqual(rows);
            expect(getGroupedData(rows, [], [])).toEqual(rows);
            expect(getGroupedAndVisibleColumns([{ key: 'type' }, { key: 'name' }], [disabledGroup]))
                .toEqual({ columns: [{ key: 'type' }, { key: 'name' }], groupColumnsCount: 0, groupedColumns: [] });
            expect(isMaxDeep({ deep: 1 }, [{ key: 'type' }, { key: 'name' }], [disabledGroup])).toBeFalsy();
        });
    });

    describe('isMaxDeep', () => {
        it('default', () => {
            expect(isMaxDeep({ deep: 1 }, [{key: '1'}, { key: '2'}], [{ columnKey: '1' }])).toBeTruthy();
            expect(isMaxDeep({ deep: 2 }, [{key: '1'}, { key: '2'}], [{ columnKey: '1' }])).toBeFalsy();
            expect(isMaxDeep({ }, [{key: '1'}, { key: '2'}, { key: '3'}], [{ columnKey: '1' }])).toBeFalsy();
            expect(isMaxDeep({ }, [{key: '1'}, { key: '2'}], [{ columnKey: '1' }])).toBeTruthy();
            expect(isMaxDeep({ }, [{key: '1'}], [{ columnKey: '1' }])).toBeTruthy();
            expect(isMaxDeep({ deep: 1 }, [{key: '1'}, { key: '2'}])).toBeFalsy();
        });
    });
});
