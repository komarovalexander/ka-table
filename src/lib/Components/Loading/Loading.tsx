import * as React from 'react';

import { ILoadingProps } from '../../props';

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
  const {
    enabled,
    text,
  } = props;
  if (enabled) {
    return (
      <div className='ka-loading'>
        <div className='ka-loading-icon'/>
          {text && (<div className='ka-loading-text'>{text}</div>)}
      </div>
    );
  }
  return (<></>);
}

export default Loading;