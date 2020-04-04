import * as React from 'react';

export class LoadingOptions{
  enabled?: boolean;
  text?: string;
}
export interface ILoadingProps {
  loading?: LoadingOptions
}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
  const {
    loading,
  } = props;
  if (loading?.enabled) {
    return (
      <div className='ka-loading'>
        <div className='ka-loading-icon'>
          <img src='https://komarovalexander.github.io/ka-table/static/icons/ValidationDemo.svg' alt=''/>
        </div>
        <div className='ka-loading-text'>
         {loading.text ? loading.text :  'Loading...'}
        </div>
      </div>
    );
  }
  return (<></>);
}

export default Loading;