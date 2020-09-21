import { updateElementTop } from './DomUtils';

describe('EffectUtils', () => {
  it('getEventListenerEffect', () => {
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
});