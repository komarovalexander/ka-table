import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { IPagingProps } from '../../props';
import PagingPages from '../PagingPages/PagingPages';

const Paging: React.FunctionComponent<IPagingProps> = (props) => {
    const {
      enabled,
      pagesCount,
    } = props;
    if (enabled){
      const pages = new Array(pagesCount).fill(undefined).map((_, index) =>  index);
      return (
        <div className={defaultOptions.css.paging}>
          <PagingPages {...props} pages={pages}/>
        </div>
      )
    }
    return (<></>);
}

export default Paging;