let dataArray = Array(10).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const get = (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataArray);
    }, 1000);
  });
};

const update = (id: any, data: any): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].id === id) {
          dataArray[i] = {...dataArray[i], ...data};
        }
      }
      resolve(dataArray);
    }, 1000);
  });
};

const deleteRow = (id: any): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dataArray = dataArray.filter((d) => d.id !== id);
      resolve(dataArray);
    }, 1000);
  });
};

export default {
  delete: deleteRow,
  get,
  update,
};
