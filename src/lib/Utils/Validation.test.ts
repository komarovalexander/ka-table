import { getValidationValue } from './Validation';

describe('Validation', () => {
  it('getValidationValue', () => {
    let result = getValidationValue(1, { field: 1 }, {
      key: 'field',
      validation: (value) => (value > 2 ? undefined : 'value must be more than 2'),
    });
    expect(result).toBe('value must be more than 2');

    result = getValidationValue(1, { field: 1 }, {
      key: 'field',
      validation: (value) => (value > 0 ? undefined : 'value must be more than 0'),
    });
    expect(result).toBe(undefined);
  });
});
