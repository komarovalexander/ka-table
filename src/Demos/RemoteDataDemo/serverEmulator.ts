
import { Column, PagingOptions } from '../../lib/models';
import { getPageData, getPagesCount } from '../../lib/Utils/PagingUtils';
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

const get = (paging?: PagingOptions, columns?: Column[]): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sortedData = columns ? sortData(columns, dataArray) : dataArray;
      const data = getPageData(sortedData, { ...paging, pagesCount: undefined });
      resolve({
        data,
        pagesCount: getPagesCount(dataArray, { ...paging, pagesCount: undefined })
      });
    }, 1000);
  });
};

const update = (id: any, data: any): Promise<any> => {
  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].id === id) {
      dataArray[i] = {...dataArray[i], ...data};
    }
  }
  return new Promise((resolve) => {resolve()});
};

const deleteRow = (id: any): Promise<any> => {
  dataArray = dataArray.filter((d) => d.id !== id);
  return new Promise((resolve) => {resolve()});
};

export default {
  delete: deleteRow,
  get,
  update,
};
