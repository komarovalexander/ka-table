
import { PagingOptions } from '../../lib/models';
import { getPageData, getPagesCount } from '../../lib/Utils/PagingUtils';

let dataArray = Array(100).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const get = (paging?: PagingOptions): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: getPageData(dataArray, { ...paging, pagesCount: undefined }),
        pagesCount: getPagesCount(dataArray, { ...paging, pagesCount: undefined })
      });
    }, 1000);
  });
};

const update = (id: any, data: any, paging?: PagingOptions): Promise<any> => {
  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].id === id) {
      dataArray[i] = {...dataArray[i], ...data};
    }
  }
  return get(paging);
};

const deleteRow = (id: any, paging?: PagingOptions): Promise<any> => {
  dataArray = dataArray.filter((d) => d.id !== id);
  return get(paging);
};

export default {
  delete: deleteRow,
  get,
  update,
};
