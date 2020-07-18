import { AllHTMLAttributes } from 'react';
import { isFunction } from 'util';

import { ITableProps } from '../';
import { Column } from '../models';
import { ChildComponent } from '../Models/ChildComponent';
import { ChildAttributesItem, DispatchFunc } from '../types';
import { filterData, searchData } from './FilterUtils';
import { getGroupedData } from './GroupUtils';
import { getPageData, getPagesCount } from './PagingUtils';
import { sortData } from './SortUtils';
import { convertToColumnTypes } from './TypeUtils';

export const extendProps = (
  childElementAttributes: AllHTMLAttributes<HTMLElement>,
  childProps: any,
  childComponent?: ChildComponent<any>): React.AllHTMLAttributes<HTMLElement> => {
    let resultProps = childElementAttributes;
    const childCustomAttributes = childComponent && childComponent.elementAttributes && childComponent.elementAttributes(childProps);
    if (childCustomAttributes) {
      const dispatch: DispatchFunc = childProps.dispatch;
      resultProps = mergeProps(childElementAttributes, childProps, childCustomAttributes, dispatch);
    }
    return resultProps;
};

const emptyFunc = () => {};
export const mergeProps = (
  childElementAttributes: AllHTMLAttributes<HTMLElement>,
  childProps: any,
  childCustomAttributes: ChildAttributesItem<any>,
  dispatch: DispatchFunc): React.AllHTMLAttributes<HTMLElement> => {
  const customPropsWithEvents: any = {};
  for (const prop in childCustomAttributes) {
    if (childCustomAttributes.hasOwnProperty(prop)) {
      const propName = prop as string;
      const propValue: any = (childCustomAttributes as any)[propName];
      const baseFunc = (childElementAttributes as any)[propName] || emptyFunc;
      if (isFunction(propValue)) {
        customPropsWithEvents[prop] = (e: any) => {
          propValue(e, {
            baseFunc,
            childElementAttributes,
            childProps,
            dispatch,
          });
        };
      }
    }
  }
  const mergedResult: React.AllHTMLAttributes<HTMLDivElement> = {
    ...childElementAttributes,
    ...childCustomAttributes,
    ...customPropsWithEvents,
    className: `${childElementAttributes.className || ''} ${childCustomAttributes.className || ''}`,
    style: { ...childCustomAttributes.style, ...childElementAttributes.style }
  };

  return mergedResult;
};

export const getData = (props: ITableProps) => {
  const {
    extendedFilter,
    columns,
    groups,
    groupsExpanded,
    paging,
    searchText,
    search,
  } = props;
  let {
    data = [],
  } = props;
  data = [...data];
  data = extendedFilter ? extendedFilter(data) : data;
  data = searchText ? searchData(columns, data, searchText, search) : data;
  data = convertToColumnTypes(data, columns);
  data = filterData(data, columns);
  data = sortData(columns, data);

  const groupedColumns: Column[] = groups ? columns.filter((c) => groups.some((g) => g.columnKey === c.key)) : [];
  const groupedData = groups ? getGroupedData(data, groups, groupedColumns, groupsExpanded) : data;
  data = getPageData(groupedData, paging);

  return data;
};

export const prepareTableOptions = (props: ITableProps) => {
  const {
    data = [],
    groups,
    paging,
  } = props;
  let {
    columns,
  } = props;

  const groupedData = getData(props);

  let groupColumnsCount = 0;
  let groupedColumns: Column[] = [];
  if (groups) {
    groupColumnsCount = groups.length;
    groupedColumns = columns.filter((c) => groups.some((g) => g.columnKey === c.key));
    columns = columns.filter((c) => !groups.some((g) => g.columnKey === c.key));
  }
  const pagesCount = getPagesCount(data, paging);
  return {
    columns,
    groupColumnsCount,
    groupedColumns,
    groupedData,
    pagesCount
  };
};
