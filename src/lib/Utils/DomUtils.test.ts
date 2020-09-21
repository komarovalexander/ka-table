import { updateElementTop } from './DomUtils';

describe('DomUtils', () => {
  describe('getEventListenerEffect', () => {
    it('default', () => {
      const elementRef = {
        current: {
          parentElement: {
            previousSibling: {
              getBoundingClientRect: () => ({ height: 20 })
            }
          },
          style: {
            top: 0
          }
        }
      };
      updateElementTop(elementRef);
      expect(elementRef.current.style.top).toBe('20px');
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
          }
        }
      };
      updateElementTop(elementRef);
      expect(elementRef.current.style.top).toBe(0);
    });
    it('height is already set', () => {
      const optionSet = jest.fn();
      const elementRef = {
        current: {
          parentElement: {
            previousSibling: {
              getBoundingClientRect: () => ({ height: 20 })
            }
          },
          style: {
            get top() {
              return '20px';
            },
            set top(value) {
              optionSet();
            }
          }
        }
      };
      updateElementTop(elementRef);
      expect(optionSet).toBeCalledTimes(0);
    });
  });
});