import './DemoPage.scss';

import React from 'react';

import Demo from './Demo';
import DemoText from './DemoText';
import { trackEvent } from './ga';

const kaStylesDisabled = ['BootstrapDemo', 'MaterialDemo', 'CustomThemeDemo'];
const getDemoPage = (demo: Demo) => {
  return () => {
    return (
      <div>
        <div className={`simulator-content ${kaStylesDisabled.includes(demo.fileName) ? '' : 'enable-ka-styles'}`}>
          <h1>{demo.group && (
            <span className='group-header'>
              {demo.group}
              <span className='group-header-icon ka-icon ka-icon-group-arrow ka-icon-group-arrow-collapsed'/>
            </span>
          )} {demo.title}</h1>
          <demo.component />
        </div>
        <div className='code'>
          <div className='code-content'>
            <div className='editor-links'>
              <span>Open in Online Editor: </span>
              <a className='editor-link editor-link-ts'
                href={demo.tsLink}
                onMouseDown={() => { trackEvent('click', 'ts_example', demo.path); }}
                rel='noopener noreferrer'
                target='_blank'>
                  TS Example
              </a>
              <span>|</span>
              <a className='editor-link editor-link-js'
                href={demo.jsLink}
                onMouseDown={() => { trackEvent('click', 'js_example', demo.path); }}
                rel='noopener noreferrer'
                target='_blank'>
                  JS Example
              </a>
            </div>
            <DemoText demoFileName={demo.fileName}/>
          </div>
        </div>
      </div>
    );
  };
};

export default getDemoPage;
