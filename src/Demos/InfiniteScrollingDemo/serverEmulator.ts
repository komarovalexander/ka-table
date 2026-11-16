import { getPageData } from '../../lib/Utils/PagingUtils';

const dataArray = Array(200).fill(undefined).map(
    (_, index) => ({
        column1: `column:1 row:${index}`,
        column2: `column:2 row:${index}`,
        column3: `column:3 row:${index}`,
        column4: `column:4 row:${index}`,
        id: index,
    }),
);
export type Row = typeof dataArray[number];

const pageSize = 20;
// the rows of the page and the index of the next page, -1 when all the rows are loaded
const get = (pageIndex: number): Promise<{ data: Row[]; pageIndex: number }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getPageData(dataArray, {
                enabled: true,
                pageSize,
                pageIndex
            });
            pageIndex = data[data.length - 1] !== dataArray[dataArray.length - 1] ? pageIndex + 1 : -1;
            resolve({
                data,
                pageIndex
            });
        }, 200);
    });
};

export default {
    get,
};
