import * as React from 'react';

export interface ILoadingProps {
  loading?: boolean;
}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
  const {
    loading,
  } = props;
  if (loading) {
    return (
      <div className='ka-loading'>
        <div className='ka-loading-icon'/>
      </div>
    );
  }
  return (<></>);
}

export default Loading;