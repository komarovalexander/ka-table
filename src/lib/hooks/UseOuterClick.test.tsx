import React from 'react';
import { createRoot } from 'react-dom/client';
import { useOuterClick } from './UseOuterClick';

describe('UseOuterClick', () => {
  it('returns ref', () => {
    const Component: React.FC = () => {
      const result = useOuterClick(() => {});

      expect(result).toBeDefined();
      return <></>;
    };

    const div = document.createElement('tbody');
    const root = createRoot(div!);
    root.render(<Component />);
  });
});
