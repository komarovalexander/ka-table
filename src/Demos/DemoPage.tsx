import './DemoPage.scss';

import React, { useEffect, useState } from 'react';
import Highlight from 'react-highlight';

const getDemoPage = (WrappedComponent: React.FC) => {
  return () => {
    const [text, changeText]: [string, any] = useState('');
    useEffect(() => {
      fetch(`demos/${WrappedComponent.name}.tsx`)
        .then((res) => res.text())
        .then((fileText) => changeText(fileText));
    }, []);
    return (
      <div>
        <WrappedComponent />
        <Highlight className='tsx'>
          {text}
        </Highlight>
      </div>
    );
  };
};

export default getDemoPage;
