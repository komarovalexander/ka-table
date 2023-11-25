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
const pageSize = 20;
const get = (pageIndex: number): Promise<any> => {
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
