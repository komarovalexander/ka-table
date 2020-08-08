import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { IPagingPagesProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { centerLength, getPagesForCenter } from '../../Utils/PagingUtils';
import PagingIndex from '../PagingIndex/PagingIndex';

const PagingPages: React.FunctionComponent<IPagingPagesProps> = (props) => {
    const {
      childComponents,
      pageIndex = 1,
      pages,
    } = props;
    const isEndShown = pageIndex < pages.length - centerLength && pages.length > centerLength + Math.ceil(centerLength / 2);
    const isStartShown = pageIndex >= centerLength && pages.length > centerLength + Math.ceil(centerLength / 2);
    const centerPages = getPagesForCenter(pages, isStartShown, isEndShown, pageIndex);

    const { elementAttributes, content } = getElementCustomization({
      className: defaultOptions.css.pagingPages
    }, props, childComponents.pagingPages);

    return (
      <div {...elementAttributes}>
        { content || (
          <>
            { isStartShown &&
              (
              <>
                <PagingIndex {...props} pageIndex={0} isActive={pageIndex === 0} text={1}/>
                <PagingIndex {...props} pageIndex={centerPages[0] - 1} isActive={false} text={'...'}/>
              </>
              )
            }
            {
              centerPages.map((value, index) => {
                return (
                  <PagingIndex {...props} pageIndex={value} isActive={pageIndex === value} key={value} text={value + 1}/>
                );
              })
            }
            { isEndShown &&
              (
              <>
                <PagingIndex {...props} pageIndex={[...centerPages].pop() + 1} isActive={false} text={'...'}/>
                <PagingIndex {...props} pageIndex={pages[pages.length - 1]} isActive={pageIndex === pages[pages.length - 1]} text={pages[pages.length - 1] + 1}/>
              </>
              )
            }
          </>
        )}
      </div>
    )
}

export default PagingPages;