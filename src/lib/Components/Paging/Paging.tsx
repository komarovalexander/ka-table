import * as React from 'react';

import { updatePageIndex } from '../../actionCreators';
import { DispatchFunc } from '../../types';

export interface IPagingProps {
  enabled?: boolean;
  pageIndex?: number;
  pageSize?: number;
}

interface IPagingExtendedProps extends IPagingProps {
  pagesCount: number;
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
      onClick={() => dispatch(updatePageIndex(pageIndex)) } 
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
    const centerLength = 5;
    let pages = new Array(pagesCount).fill(undefined).map((_, index) =>  index);
    
    const isEndShown = pageIndex < pages.length - centerLength && pages.length > centerLength + Math.ceil(centerLength / 2);
    let lastIndex = 0;
    if(isEndShown){
      lastIndex = pages[pages.length-1];
    }
    const isStartShown = pageIndex >= centerLength && pages.length > centerLength + Math.ceil(centerLength / 2);
    
    if(isStartShown && !isEndShown){
      pages = pages.filter(index => (index >= pages.length - centerLength - 1) && (index <= pageIndex + centerLength));
    } else if (!isStartShown && isEndShown) {
      pages = pages.filter(index => (index >= pageIndex - centerLength) && (index <= centerLength))
    } else if (isStartShown && isEndShown) {
      pages = pages.filter(index => (index >= pageIndex - Math.floor(centerLength / 2)) && (index <= pageIndex + Math.floor(centerLength / 2)))
    }
   
    if(enabled){
      return (
        <div className='ka-paging'>      
          <div className='ka-paging-pages'>
            { isStartShown && 
              <>
                <PageIndex dispatch={dispatch} pageIndex={0} activePageIndex={pageIndex}/>    
                <div className={`ka-paging-page-index`} 
                  key={-1}>
                  ...
                </div>
              </>
            }
            {
              pages.map((value, index) => {
                return (
                  <PageIndex dispatch={dispatch} pageIndex={value} activePageIndex={pageIndex} key={value}/>
                );
              })
            }
            { isEndShown && 
              <>
                <div className={`ka-paging-page-index`} 
                  key={-2}>
                    ...
                </div>
                <PageIndex dispatch={dispatch} pageIndex={lastIndex} activePageIndex={pageIndex} />
              </>
            }
          </div>
        </div>
      )
    }
    return (<></>);   
}

export default Paging;