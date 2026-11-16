export const getCopyOfArrayAndAddItem = <T>(item: T, array: T[] = []): T[] => {
    return array.concat([item]);
};

export const getCopyOfArrayAndDeleteItem = <T>(item: T, rowKeyField: keyof T, array: T[]): T[] => {
    const rowKeyValue = item[rowKeyField];
    return array.filter((i) => i[rowKeyField] !== rowKeyValue);
};

export const getCopyOfArrayAndInsertOrReplaceItem = <T>(item: T, rowKeyField: keyof T, array: T[]): T[] => {
    const newArray = [...array];
    const rowKeyValue = item[rowKeyField];
    const index = newArray.findIndex((i) => i[rowKeyField] === rowKeyValue);
    index >= 0 ? newArray.splice(index, 1, item) : newArray.push(item);
    return newArray;
};
