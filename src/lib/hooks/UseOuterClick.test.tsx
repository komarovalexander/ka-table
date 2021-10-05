import React from 'react';
import ReactDOM from 'react-dom';

import { useOuterClick } from './UseOuterClick';

describe('UseOuterClick', () => {
  it('returns ref', () => {
    const Component: React.FC = () => {
      const result = useOuterClick(() => {});

      expect(result).toBeDefined();
      return <></>;
    };

    const div = document.createElement('tbody');
    ReactDOM.render(<Component />, div);
  });
});
