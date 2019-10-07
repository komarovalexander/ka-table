export const getCopyOfArrayAndAddItem = (item: any, array: any[] = []): any[] => {
  return array.concat([item]);
};

export const getCopyOfArrayAndReplaceItem = (item: any, rowKey: any, array: any[]): any[] => {
  const newArray = [...array];
  const rowKeyValue = item[rowKey];
  const index = newArray.findIndex((i) => i[rowKey] === rowKeyValue);
  newArray.splice(index, 1, item);
  return newArray;
};
