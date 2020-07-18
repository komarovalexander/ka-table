import './DemoPage.scss';

import React from 'react';

import Demo from './Demo';
import DemoText from './DemoText';
import { trackEvent } from './ga';

const kaStylesDisabled = ['BootstrapDemo'];
const getDemoPage = (demo: Demo) => {
  return () => {
    return (
      <div>
        <div className={`simulator-content ${kaStylesDisabled.includes(demo.fileName) ? '' : 'enable-ka-styles'}`}>
          <h1>{demo.title}</h1>
          <demo.component />
        </div>
        <div className='code'>
          <div className='editor-links'>
            <span>Open in Online Editor: </span>
            {demo.disableOnlineEditor || (
              <>
                <a className='editor-link editor-link-ts'
                  href={demo.tsLink}
                  onMouseDown={() => { trackEvent('click', 'ts_example', demo.path); }}
                  rel='noopener noreferrer'
                  target='_blank'>
                    TS Example
                </a>
                <span>|</span>
              </>
            )}
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
    );
  };
};

export default getDemoPage;
