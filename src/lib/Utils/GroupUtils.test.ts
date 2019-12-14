import groupMark from '../keys';
import { Group } from '../Models/Group';
import { GroupRowData } from '../Models/GroupRowData';
import {
  convertToFlat, getExpandedGroups, getGroupedStructure, groupBy, groupClick,
} from './GroupUtils';

describe('GroupUtils', () => {
  const columnMap = { country: 'country', type: 'type' };
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
    const groupRowData: GroupRowData = { key: ['dog'], value: 'Rex', groupMark };
    const groupedData: any[] = [{}, groupRowData, {}];
    const result = getExpandedGroups(groupedData);
    expect(result).toEqual([['dog']]);
  });

  it('groupClick add', () => {
    const groupsExpanded: any[][] = [['cat']];
    const groupRowData: GroupRowData = { key: ['dog'], value: 'Rex', groupMark: {} };
    const onOptionChanged = jest.fn((x) => {});
    groupClick(groupsExpanded, groupRowData, onOptionChanged);
    expect(onOptionChanged.mock.calls.length).toBe(1);
    expect(onOptionChanged.mock.calls[0]).toEqual([{groupsExpanded: [['cat'], ['dog']]}]);
  });

  it('groupClick remove', () => {
    const groupsExpanded: any[][] = [['cat']];
    const groupRowData: GroupRowData = { key: ['cat'], value: 'Tom', groupMark: {} };
    const onOptionChanged = jest.fn((x) => {});
    groupClick(groupsExpanded, groupRowData, onOptionChanged);
    expect(onOptionChanged.mock.calls.length).toBe(1);
    expect(onOptionChanged.mock.calls[0]).toEqual([{groupsExpanded: []}]);
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
      const result = getGroupedStructure(data, groups, columnMap);
      expect(result).toMatchSnapshot();
    });

    it('expanded root', () => {
      const result = getGroupedStructure(data, groups, columnMap, 0, [['Czech Republic']]);
      expect(result).toMatchSnapshot();
    });
    it('expanded second', () => {
      const result = getGroupedStructure(data, groups, columnMap, 0, [['Czech Republic'], ['Czech Republic', 'Cat']]);
      expect(result).toMatchSnapshot();
    });
    it('should not expand second', () => {
      const result = getGroupedStructure(data, groups, columnMap, 0, [['Czech Republic', 'Cat']]);
      expect(result).toMatchSnapshot();
    });
    it('expanded couple', () => {
      const result = getGroupedStructure(data, groups, columnMap, 0,
        [['Czech Republic'], ['Czech Republic', 'Cat'], ['Montenegro']]);
      expect(result).toMatchSnapshot();
    });
    it('expanded couple (skip Czech Republic)', () => {
      const result = getGroupedStructure(data, groups, columnMap, 0, [['Czech Republic', 'Cat'], ['Montenegro']]);
      expect(result).toMatchSnapshot();
    });
  });
});
