import { updateChildrenTop } from './DomUtils';

describe('DomUtils', () => {
  describe('getEventListenerEffect', () => {
    it('default', () => {
      const elementRef = {
        current: {
          previousSibling: {
            getBoundingClientRect: () => ({ height: 20 })
          },
          style: {
            top: 0
          },
          childNodes: [{
            style: {
              top: 0
            }
          }, {
            style: {
              top: 0
            }
          }]
        }
      };
      updateChildrenTop(elementRef);
      expect(elementRef.current.style.top).toBe('20px');
      expect(elementRef.current.childNodes[0].style.top).toBe('20px');
      expect(elementRef.current.childNodes[1].style.top).toBe('20px');
    });
    it('getBoundingClientRect returns null', () => {
      const elementRef = {
        current: {
          parentElement: {
            previousSibling: {
              getBoundingClientRect: () => null
            }
          },
          style: {
            top: 0
          },
          childNodes: [{
            style: {
              top: 0
            }
          }, {
            style: {
              top: 0
            }
          }]
        }
      };
      updateChildrenTop(elementRef);
      expect(elementRef.current.style.top).toBe(0);
      expect(elementRef.current.childNodes[0].style.top).toBe(0);
      expect(elementRef.current.childNodes[1].style.top).toBe(0);
    });
    it('child childNodes is undefined', () => {
      const elementRef = {
        current: {
          parentElement: {
            previousSibling: {
              getBoundingClientRect: () => 10
            }
          },
          style: {
            top: 0
          },
        }
      };
      updateChildrenTop(elementRef);
      expect(elementRef.current.style.top).toBe(0);
    });
    it('height is already set', () => {
      const optionSet = jest.fn();
      const elementRef = {
        current: {
          previousSibling: {
            getBoundingClientRect: () => ({ height: 20 })
          },
          style: {
            get top() {
              return '20px';
            },
            set top(value) {
              optionSet();
            }
          },
          childNodes: [{
            style: {
              top: undefined
            }
          }]
        }
      };
      updateChildrenTop(elementRef);
      expect(optionSet).toBeCalledTimes(0);
      expect(elementRef.current.childNodes[0].style.top).toBeUndefined();
    });
  });
});
