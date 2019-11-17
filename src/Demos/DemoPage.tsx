import './DemoPage.scss';

import React, { useEffect, useState } from 'react';
import Highlight from 'react-highlight';

import Demo from './Demo';

const getDemoPage = (demo: Demo) => {
  return () => {
    const [text, changeText]: [string, any] = useState('');
    useEffect(() => {
      const name = demo.fileName;
      fetch(`demos/${name}/${name}.tsx`)
        .then((res) => res.text())
        .then((fileText) => changeText(fileText));
    }, []);
    return (
      <div>
        <h1>{demo.title}</h1>
        <demo.component />
        <Highlight className='language-typescript'>
          {text}
        </Highlight>
      </div>
    );
  };
};

export default getDemoPage;
