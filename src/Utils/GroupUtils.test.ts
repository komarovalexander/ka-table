import { Group } from '../Models/Group';
import { convertToFlat, getGroupedStructure, groupBy } from './GroupUtils';

describe('GroupUtils', () => {
  const data = [
    { type: 'Cat', name: 'Kas', country: 'Czech Republic' },
    { type: 'Dog', name: 'Rex', country: 'Montenegro' },
    { type: 'Cat', name: 'Simba', country: 'France' },
    { type: 'Dog', name: 'Beethoven', country: 'Czech Republic' },
    { type: 'Cat', name: 'Hash', country: 'Czech Republic' },
  ];
  const groups: Group[] = [{
    id: 'country',
  }, {
    id: 'type',
  }];

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

  it('groupBy', () => {
    const result = groupBy(data, (item: any) => item.type);
    expect(result).toMatchSnapshot();
  });

  it('getGroupedStructure', () => {
    const result = getGroupedStructure(data, groups);
    expect(result).toMatchSnapshot();
  });
});
