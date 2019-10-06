import './App.css';

import React from 'react';

import BasicDemo from './Demos/BasicDemo/BasicDemo';
import getDemoPage from './Demos/DemoPage';

const App: React.FC = () => {
  const DemoPage = getDemoPage(BasicDemo);
  return (
    <DemoPage />
  );
};

export default App;
