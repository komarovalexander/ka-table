export const isEmpty = (value: any) => (value == null || value.length === 0);

const contains = (data: any[], item: any) => data[item.field].includes(item.value);
const equals = (data: any[], item: any) => ((typeof item.value === 'string')
  ? data[item.field].toLowerCase().includes(item.value.toLowerCase())
  : data[item.field] === item.value);
const notEqual = (data: any[], item: any) => !equals(data, item);
const more = (data: any[], item: any) => data[item.field] > item.value;
const moreOrEqual = (data: any[], item: any) => data[item.field] >= item.value;
const less = (data: any[], item: any) => data[item.field] < item.value;
const lessOrEqual = (data: any[], item: any) => data[item.field] < item.value;
const blank = (data: any[], item: any) => isEmpty(data[item.field]);
const notBlank = (data: any[], item: any) => !isEmpty(data[item.field]);
export const filterItem = (data: any[], filter: any) => {
  switch (filter.operator) {
    case 'contains': return contains(data, filter);
    case '=': return equals(data, filter);
    case '<>': return notEqual(data, filter);
    case '>': return more(data, filter);
    case '>=': return moreOrEqual(data, filter);
    case '<': return less(data, filter);
    case '<=': return lessOrEqual(data, filter);
    case 'blank': return blank(data, filter);
    case 'notBlank': return notBlank(data, filter);
    default: throw Error('unknown operator');
  }
};

export const filterGroup = (data: any[], groupName: string, items: any[]): any[] =>
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
