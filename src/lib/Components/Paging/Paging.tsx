import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { IPagingProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import PagingPages from '../PagingPages/PagingPages';
import PagingSizes from '../PagingSizes/PagingSizes';

const Paging: React.FunctionComponent<IPagingProps> = (props) => {
    const {
        childComponents,
        pageSizes
    } = props;
    const { elementAttributes, content } = getElementCustomization({
        className: `${defaultOptions.css.paging} ${pageSizes ? 'ka-paging-sizes-active' : ''}`,
    }, props, childComponents.paging);
    return (
        <div {...elementAttributes}>
            {content ||
        (
            <>
                {pageSizes && <PagingSizes {...props}/>}
                <PagingPages {...props}/>
            </>
        )}
        </div>
    );
}

export default Paging;
