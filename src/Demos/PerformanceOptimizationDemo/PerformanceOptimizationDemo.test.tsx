import React from 'react';
import ReactDOM from 'react-dom';

import PerformanceOptimizationDemo from './PerformanceOptimizationDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PerformanceOptimizationDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
