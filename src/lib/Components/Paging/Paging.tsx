import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { IPagingProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import PagingPages from '../PagingPages/PagingPages';

const Paging: React.FunctionComponent<IPagingProps> = (props) => {
    const {
      enabled,
      childComponents,
    } = props;
    if (enabled){
      const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.paging,
      }, props, childComponents.paging);
      return (
        <div {...elementAttributes}>
          {content || <PagingPages {...props}/>}
        </div>
      )
    }
    return (<></>);
}

export default Paging;
