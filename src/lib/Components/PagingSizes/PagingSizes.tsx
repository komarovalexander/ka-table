import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { IPagingProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import PagingSizeItem from '../PagingSize/PagingSize';

const PagingSizes: React.FunctionComponent<IPagingProps> = (props) => {
    const {
      childComponents,
      pageSizes = [],
    } = props;

    const { elementAttributes, content } = getElementCustomization({
      className: defaultOptions.css.pagingSizes
    }, props, childComponents.pagingSizes);

    return (
      <ul {...elementAttributes}>
        { content || (
          pageSizes.map(value => <PagingSizeItem {...props} key={value} value={value}/>)
        )}
      </ul>
    )
}

export default PagingSizes;
