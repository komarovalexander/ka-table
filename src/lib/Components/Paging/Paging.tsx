import * as React from 'react';

export interface IPagingProps {
  enabled?: boolean;
  pageIndex?: number;
  pageSize?: number;
}

interface IPagingExtendedProps extends IPagingProps {
  pagesCount: number;
}
const Paging: React.FunctionComponent<IPagingExtendedProps> = ({ 
    enabled,
    pagesCount,
    pageIndex,
  }) => {
    const pages = new Array(pagesCount).fill(undefined).map((_, index) =>  index += 1);
  if(enabled){
    return (
      <div>{
        pages.map((value, index) => {
        return <div className={`ka-page-number ${pageIndex === index ? 'ka-page-number-active' : ''}`} key={index}>{value}</div>})}
      </div>);
  }
    return (<></>);   
}

export default Paging;