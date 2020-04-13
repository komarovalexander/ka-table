import * as React from 'react';

export interface ILoadingProps {
  enabled?: boolean;
}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
  const {
    enabled,
  } = props;
  if (enabled) {
    return (
      <div className='ka-loading'>
        <div className='ka-loading-icon'/>
      </div>
    );
  }
  return (<></>);
}

export default Loading;