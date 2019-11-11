import './DemoPage.scss';

import React, { useEffect, useState } from 'react';
import Highlight from 'react-highlight';

import bootstrapCssClasses from '../lib/bootstrapCssClasses';
import defaultOptions from '../lib/defaultOptions';

defaultOptions.css = bootstrapCssClasses;

const getDemoPage = (WrappedComponent: React.FC, title: string) => {
  return () => {
    const [text, changeText]: [string, any] = useState('');
    useEffect(() => {
      const name = WrappedComponent.name;
      fetch(`demos/${name}/${name}.tsx`)
        .then((res) => res.text())
        .then((fileText) => changeText(fileText));
    }, []);
    return (
      <div>
        <h1>{title}</h1>
        <WrappedComponent />
        <Highlight className='language-typescript'>
          {text}
        </Highlight>
      </div>
    );
  };
};

export default getDemoPage;
