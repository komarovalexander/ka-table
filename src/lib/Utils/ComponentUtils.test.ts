import { addElementAttributes, getElementCustomization } from './ComponentUtils';

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

  it('should add attributes', () => {
    const contentFunc = () => 'Hello';
    const { content, elementAttributes } = getElementCustomization({
      className: 'customClass'
    }, { propName: 'propNameValue' }, {
      content: contentFunc,
      elementAttributes: () => ({
        className: 'elementAttributesClass',
        tabIndex: 0
      })
    });
    expect(content).toEqual('Hello');
    expect(elementAttributes.className).toEqual('customClass elementAttributesClass');
    expect(elementAttributes.tabIndex).toEqual(0);
  });
});
