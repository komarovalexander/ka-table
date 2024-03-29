import { PagingPosition } from '../enums';
import { PagingOptions } from '../models';

export const centerLength = 5;
const DEFAULT_PAGE_SIZE = 10;
export const getPagesCount = (data: any[], paging?: PagingOptions): number => {
    if (!paging || !paging.enabled) {
        return 1;
    }
    if (paging.pagesCount) {
        return paging.pagesCount;
    }
    return Math.ceil(data.length / ((paging && paging.pageSize) || DEFAULT_PAGE_SIZE));
};

export const getPageData = (data: any[], paging?: PagingOptions): any[] => {
    if (!paging || !paging.enabled || paging.pagesCount) {
        return data;
    }
    const pageSize = paging.pageSize || DEFAULT_PAGE_SIZE;
    const pageIndex = paging.pageIndex || 0;
    const startIndex = pageSize * pageIndex;
    return data.slice(startIndex, startIndex + pageSize);

};
export const getPagesForCenter = (pages: number[], isStartShown: boolean, isEndShown: boolean, pageIndex: number): any[] => {
    if (isStartShown && !isEndShown){
        return pages.filter(page => (page >= pages.length - centerLength - 1));
    } else if (!isStartShown && isEndShown) {
        return pages.filter(page => (page <= centerLength));
    } else if (isStartShown && isEndShown) {
        return pages.filter(page => (page >= pageIndex - Math.floor(centerLength / 2)) && (page <= pageIndex + Math.floor(centerLength / 2)));
    }
    return pages;
};

export const getPagesArrayBySize = (pagesCount?: number) => new Array(pagesCount).fill(undefined).map((_, index) =>  index);

export const isPagingShown = (position: PagingPosition, paging?: PagingOptions): boolean => !!(
    paging?.enabled
  && (
      paging.position
          ? position === paging.position || paging.position === PagingPosition.TopAndBottom
          : position === PagingPosition.Bottom
  )
);
