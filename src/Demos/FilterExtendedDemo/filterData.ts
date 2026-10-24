// a row of the table: the values by the fields
type Row = Record<string, string | number | boolean>;
// the values of the filter control: the groups of the conditions
type FilterCondition = { field: string; operator: string; value?: string | number };
type FilterGroup = { groupName: string; items: (FilterGroup | FilterCondition)[] };

const contains = (data: Row, item: FilterCondition) => {
    if (!item.value) { return true; }
    return data[item.field].toString().toLowerCase().includes(item.value.toString().toLowerCase());
};
const doesNotContain = (data: Row, item: FilterCondition) => {
    if (!item.value) { return true; }
    return !data[item.field].toString().toLowerCase().includes(item.value.toString().toLowerCase());
};
const equals = (data: Row, item: FilterCondition) => {
    if (!item.value) { return true; }
    return data[item.field].toString().toLowerCase() === item.value.toString().toLowerCase();
};
const isNotEqual = (data: Row, item: FilterCondition) => {
    if (!item.value) { return true; }
    return data[item.field].toString().toLowerCase() !== item.value.toString().toLowerCase();
};
const more = (data: Row, item: FilterCondition) => item.value != null && data[item.field] > item.value;
const less = (data: Row, item: FilterCondition) => item.value != null && data[item.field] < item.value;
const filterItem = (data: Row, filter: FilterCondition) => {
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
const isGroup = (item: FilterGroup | FilterCondition): item is FilterGroup => 'items' in item;

const filterGroup = <T extends Row>(data: T[], groupName: string, items: (FilterGroup | FilterCondition)[]): T[] =>
    (groupName.toLowerCase() === 'or' ? filterGroupOr(data, items) : filterGroupAnd(data, items));

export const filterGroupOr = <T extends Row>(data: T[], items: (FilterGroup | FilterCondition)[]): T[]  => {
    const filteredData = items.reduce<T[]>((initialData, item) => {
        if (isGroup(item)) {
            const grouped = filterGroup(data, item.groupName, item.items);
            return initialData.concat(grouped.filter((d) => initialData.indexOf(d) < 0));
        }
        return initialData.concat(data.filter((d) => initialData.indexOf(d) < 0 && filterItem(d, item)));
    }, []);
    return data.filter((d) => filteredData.includes(d));
};

export const filterGroupAnd = <T extends Row>(data: T[], items: (FilterGroup | FilterCondition)[]): T[]  => {
    return items.reduce((initialData, item) => {
        if (isGroup(item)) { return filterGroup(initialData, item.groupName, item.items); }
        return initialData.filter((d) => filterItem(d, item));
    }, data);
};

export const filterData = <T extends Row>(data: T[], filterValue: FilterGroup): T[] => {
    return filterGroup(data, filterValue.groupName, filterValue.items);
};
