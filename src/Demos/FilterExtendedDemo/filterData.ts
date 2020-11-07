const contains = (data: any[], item: any) => {
  if (!item.value) { return true; }
  return data[item.field].toLowerCase().includes(item.value.toLowerCase());
};
const doesNotContain = (data: any[], item: any) => {
  if (!item.value) { return true; }
  return !data[item.field].toLowerCase().includes(item.value.toLowerCase());
};
const equals = (data: any[], item: any) => {
  if (!item.value) { return true; }
  return data[item.field].toString().toLowerCase() === item.value.toString().toLowerCase();
};
const isNotEqual = (data: any[], item: any) => {
  if (!item.value) { return true; }
  return data[item.field].toString().toLowerCase() !== item.value.toString().toLowerCase();
};
const more = (data: any[], item: any) => data[item.field] > item.value;
const less = (data: any[], item: any) => data[item.field] < item.value;
const filterItem = (data: any[], filter: any) => {
  switch (filter.operator) {
    case 'contains': return contains(data, filter);
    case 'doesNotContain': return doesNotContain(data, filter);
    case '=': return equals(data, filter);
    case '<>': return isNotEqual(data, filter);
    case '>': return more(data, filter);
    case '<': return less(data, filter);
    default: throw Error('unknown operator');
  }
};

const filterGroup = (data: any[], groupName: string, items: any[]): any[] =>
  (groupName.toLowerCase() === 'or' ? filterGroupOr(data, items) : filterGroupAnd(data, items));

export const filterGroupOr = (data: any[], items: any[]): any[]  => {
  const filteredData = items.reduce((initialData: any, item: any) => {
    if (item.items) {
      const grouped = filterGroup(data, item.groupName, item.items);
      return initialData.concat(grouped.filter((d: any) => initialData.indexOf(d) < 0));
    }
    return initialData.concat(data.filter((d: any) => initialData.indexOf(d) < 0 && filterItem(d, item)));
  }, []);
  return data.filter((d) => filteredData.includes(d));
};

export const filterGroupAnd = (data: any[], items: any[]): any[]  => {
  return items.reduce((initialData: any[], item: any) => {
    if (item.items) { return filterGroup(initialData, item.groupName, item.items); }
    return initialData.filter((d: any[]) => filterItem(d, item));
  }, data);
};

export const filterData = (data: any[] , filterValue: any): any[]  => {
  return filterGroup(data, filterValue.groupName, filterValue.items);
};
