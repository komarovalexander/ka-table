import { IPagingProps } from '../Components/Paging/Paging';

export const getPagesCount = (data: any[], paging?: IPagingProps): number => {
  return paging && paging.enabled ? Math.ceil(data.length / ((paging && paging.pageSize) || 10)) : 1;
};