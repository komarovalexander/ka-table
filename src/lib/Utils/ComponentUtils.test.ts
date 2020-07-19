import { getElementCustomization } from './ComponentUtils';

describe('getElementCustomization', () => {
  it('should return content & attributes', () => {
    const contentFunc = () => 'Hello';
    const { content, elementAttributes } = getElementCustomization({
      className: 'customClass'
    }, { propName: 'propNameValue' }, {
      content: contentFunc
    });
    expect(content).toEqual('Hello');
    expect(elementAttributes.className).toEqual('customClass');
  });
});
