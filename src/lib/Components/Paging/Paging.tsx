import * as React from 'react';

import { updatePageIndex } from '../../actionCreators';
import { DispatchFunc } from '../../types';
import { centerLength, getPagesForCenter } from '../../Utils/PagingUtils';

export interface IPagingProps {
  enabled?: boolean;
  pageIndex?: number;
  pageSize?: number;
  pagesCount?: number;
}

interface IPagingExtendedProps extends IPagingProps {
  dispatch: DispatchFunc;
}

interface IPageIndexProps extends IPagingProps {
  activePageIndex: number;
  dispatch: DispatchFunc;
  pageIndex: number;
}
const PageIndex: React.FunctionComponent<IPageIndexProps> = ({
  dispatch,
  activePageIndex,
  pageIndex
}) => {
  return  (
    <div
      onClick={() => dispatch(updatePageIndex(pageIndex))}
      className={`ka-paging-page-index ${activePageIndex === pageIndex ? 'ka-paging-page-index-active' : ''}`}
    >
      {pageIndex + 1}
    </div>
  );
};

const Paging: React.FunctionComponent<IPagingExtendedProps> = ({
    enabled,
    pagesCount,
    pageIndex = 1,
    dispatch,
  }) => {
    const pages = new Array(pagesCount).fill(undefined).map((_, index) =>  index);

    const isEndShown = pageIndex < pages.length - centerLength && pages.length > centerLength + Math.ceil(centerLength / 2);
    const isStartShown = pageIndex >= centerLength && pages.length > centerLength + Math.ceil(centerLength / 2);
    const centerPages = getPagesForCenter(pages, isStartShown, isEndShown, pageIndex);

    if (enabled){
      return (
        <div className='ka-paging'>
          <div className='ka-paging-pages'>
            { isStartShown &&
              (
              <>
                <PageIndex dispatch={dispatch} pageIndex={0} activePageIndex={pageIndex}/>
                <div className={`ka-paging-page-index`}
                  key={-1}>
                  ...
                </div>
              </>
              )
            }
            {
              centerPages.map((value, index) => {
                return (
                  <PageIndex dispatch={dispatch} pageIndex={value} activePageIndex={pageIndex} key={value}/>
                );
              })
            }
            { isEndShown &&
              (
              <>
                <div className={`ka-paging-page-index`}
                  key={-2}>
                    ...
                </div>
                <PageIndex dispatch={dispatch} pageIndex={pages[pages.length - 1]} activePageIndex={pageIndex} />
              </>
              )
            }
          </div>
        </div>
      )
    }
    return (<></>);
}

export default Paging;