import { getPageData, getPagesCount } from '../../lib/Utils/PagingUtils';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Column } from '../../lib/models';
import { sortData } from '../../lib/Utils/SortUtils';

let dataArray = Array(100).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

export const useGet = (pageIndexNew: number, columns: Column[]) => {
  return useQuery<any, any>(['useGet', pageIndexNew, JSON.stringify(columns)], async () => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        const paging = {
          enabled: true,
          pageIndex: pageIndexNew,
          pageSize: 10
        };
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
      }, 1000)});
  }, {
    cacheTime: 0
  });
}


export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation(({id, data}: {id: any, data: any}) => new Promise((resolve) => {
    setTimeout(async () => {
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].id === id) {
          dataArray[i] = {...dataArray[i], ...data};
        }
      }
      await queryClient.refetchQueries();
      resolve({});
      
    }, 1000)})
  );
};

export const useDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(async (id: any) => new Promise((resolve) => {
      setTimeout(async () => {
        dataArray = dataArray.filter((d) => d.id !== id);
        await queryClient.refetchQueries();
        resolve({});
      }, 1000);
    })
  );
};

