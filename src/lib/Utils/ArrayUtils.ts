export const getCopyOfArrayAndAddItem = (item: any, array: any[] = []): any[] => {
  return array.concat([item]);
};

export const getCopyOfArrayAndDeleteItem = (item: any, rowKeyField: any, array: any[]): any[] => {
  const rowKeyValue = item[rowKeyField];
  return array.filter((i) => i[rowKeyField] !== rowKeyValue);
};

export const getCopyOfArrayAndInsertOrReplaceItem = (item: any, rowKeyField: any, array: any[]): any[] => {
  const newArray = [...array];
  const rowKeyValue = item[rowKeyField];
  const index = newArray.findIndex((i) => i[rowKeyField] === rowKeyValue);
  index >= 0 ? newArray.splice(index, 1, item) : newArray.push(item);
  return newArray;
};
