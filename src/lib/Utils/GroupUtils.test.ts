import {
    convertToFlat,
    getExpandedGroups,
    getGroupMark,
    getGroupText,
    getGroupedStructure,
    groupBy,
    groupDataMark,
    groupSummaryMark,
    isMaxDeep,
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
            const value: any = []; // value is empty in case of collapsed group
            value.groupDataMark = groupDataMark;
            value.groupData = [{
                country: 'France',
                name: 'Simba',
                type: 'Cat',
            }];
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
                        key: [['France', 'Cat'], '--: + summary--\\'],
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
                            key: [['France', 'Cat'], '--: + summary--\\'],
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
        const groupedData: any[] = [{}, groupRowData, {}];
        const result = getExpandedGroups(groupedData);
        expect(result).toEqual([['dog']]);
    });

    it('updateExpandedGroups add', () => {
        const groupsExpanded: any[][] = [['cat']];
        const updated = updateExpandedGroups(groupsExpanded, ['dog']);
        expect(updated).toEqual([['cat'], ['dog']]);
    });

    it('updateExpandedGroups remove', () => {
        const groupsExpanded: any[][] = [['cat']];
        const updated = updateExpandedGroups(groupsExpanded, ['cat']);
        expect(updated).toEqual([]);
    });

    it('groupBy', () => {
        const result = groupBy(data, (item: any) => item.type);
        expect(result).toMatchSnapshot();
    });

    it('groupBy empty', () => {
        const result = groupBy(data, (item: any) => item.type, true);
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
                ({column, value}) => undefined
            );
            expect(result).toEqual('Column Title: Group Text');
        });
        it('format - groupItems', () => {
            const result = getGroupText(
                'Group Text',
                { key: 'column1', title: 'Column Title' },
                ({column, value, rowData }) => `Column: ${column.title}, Value: ${value}, rowData: ${JSON.stringify(rowData)}`,
                [{ id: 'hello'}, {id: 'im robot'}],
            );
            expect(result).toEqual('Column: Column Title, Value: Group Text, rowData: {\"id\":\"hello\"}');
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
