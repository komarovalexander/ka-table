import './DemoPage.scss';

import Demo from './Demo';
import DemoText from './DemoText';
import React from 'react';
import { trackEvent } from './ga';

const kaStylesDisabled = ['BootstrapDemo', 'CustomThemeDemo'];
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
              <a className='editor-link editor-link-ts'
                href={demo.tsLink}
                onMouseDown={() => { trackEvent('click', 'ts_example', demo.path); }}
                rel='noopener noreferrer'
                target='_blank'>
                  Open in Online Editor
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
