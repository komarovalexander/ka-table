export const getCopyOfArrayAndAddItem = (item: any, array: any[] = []): any[] => {
  return array.concat([item]);
};

export const getCopyOfArrayAndDeleteItem = (item: any, rowKey: any, array: any[]): any[] => {
  const rowKeyValue = item[rowKey];
  return array.filter((i) => i[rowKey] !== rowKeyValue);
};

export const getCopyOfArrayAndInsertOrReplaceItem = (item: any, rowKey: any, array: any[]): any[] => {
  const newArray = [...array];
  const rowKeyValue = item[rowKey];
  const index = newArray.findIndex((i) => i[rowKey] === rowKeyValue);
  index >= 0 ? newArray.splice(index, 1, item) : newArray.push(item);
  return newArray;
};
