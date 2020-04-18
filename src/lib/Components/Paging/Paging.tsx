import * as React from 'react';

export interface IPagingProps {
  enabled?: boolean;
  pageIndex?: number;
  pageSize?: number;
}

const Paging: React.FunctionComponent<IPagingProps> = (props) => {
       
  return (<div>Paging</div>);
}

export default Paging;