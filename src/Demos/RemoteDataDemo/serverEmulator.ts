import { getPageData, getPagesCount } from '../../lib/Utils/PagingUtils';

import { DataType } from '../../lib';
import { sortData } from '../../lib/Utils/SortUtils';
import { useQuery } from 'react-query';

let dataArray = Array(100).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

export const useGet = (pageIndexNew?: number) => {
  return useQuery<any, any>(['useGet', pageIndexNew], () => new Promise((resolve) => {
    setTimeout(() => {
      const paging = {
        enabled: true,
        pageIndex: pageIndexNew,
        pageSize: 10
      };
      const columns = [
        { key: 'column1', title: 'Column 1', dataType: DataType.String },
        { key: 'column2', title: 'Column 2', dataType: DataType.String },
        { key: 'column3', title: 'Column 3', dataType: DataType.String },
        { key: 'column4', title: 'Column 4', dataType: DataType.String },
      ]
      const sortedData = columns ? sortData(columns, dataArray) : dataArray;
      const data = getPageData(sortedData, {
        ...paging,
        pagesCount: undefined,
        pageIndex: pageIndexNew != null ? pageIndexNew : paging?.pageIndex
      });
      resolve({
        data,
        pagesCount: getPagesCount(dataArray, { ...paging, pagesCount: undefined })
      });
    }, 1000)}), {
      cacheTime: 0
    });
}
