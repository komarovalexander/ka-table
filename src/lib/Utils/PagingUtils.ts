import { IPagingProps } from '../Components/Paging/Paging';

const DEFAULT_PAGE_SIZE = 10;
export const getPagesCount = (data: any[], paging?: IPagingProps): number => {
  return paging && paging.enabled ? Math.ceil(data.length / ((paging && paging.pageSize) || DEFAULT_PAGE_SIZE)) : 1;
};

export const getPageData = (data: any[], paging?: IPagingProps): any[] => {
  if(!paging || !paging.enabled) {
    return data;
  }
  const pageSize = paging.pageSize || DEFAULT_PAGE_SIZE;
  const pageIndex = paging.pageIndex || 0;
  const startIndex = pageSize * pageIndex;
  return data.slice(startIndex, startIndex + pageSize);

};