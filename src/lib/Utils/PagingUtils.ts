import { IPagingProps } from '../Components/Paging/Paging';

export const centerLength = 5;
const DEFAULT_PAGE_SIZE = 10;
export const getPagesCount = (data: any[], paging?: IPagingProps): number => {
  if (!paging || !paging.enabled) {
    return 1;
  }
  if (paging.pagesCount) {
    return paging.pagesCount;
  }
  return Math.ceil(data.length / ((paging && paging.pageSize) || DEFAULT_PAGE_SIZE));
};

export const getPageData = (data: any[], paging?: IPagingProps): any[] => {
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