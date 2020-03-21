import { HTMLAttributes } from 'react';
import { isFunction } from 'util';

import { ITableOption } from '../';
import { Column } from '../models';
import { ChildAttributesItem } from '../types';
import { filterData, searchData } from './FilterUtils';
import { getGroupedData } from './GroupUtils';
import { sortData } from './SortUtils';
import { convertToColumnTypes } from './TypeUtils';

export const extendProps = (
  childElementAttributes: HTMLAttributes<HTMLElement>,
  childProps: any,
  childCustomAttributes: ChildAttributesItem<any> | undefined,
  dispatch: any): React.HTMLAttributes<HTMLElement> => {
    let resultProps = childElementAttributes;
    if (childCustomAttributes) {
      resultProps = mergeProps(childElementAttributes, childProps, childCustomAttributes, dispatch);
    }
    return resultProps;
};

const emptyFunc = () => {};
export const mergeProps = (
  childElementAttributes: HTMLAttributes<HTMLElement>,
  childProps: any,
  childCustomAttributes: ChildAttributesItem<any>,
  dispatch: any): React.HTMLAttributes<HTMLElement> => {
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
  const mergedResult: React.HTMLAttributes<HTMLDivElement> = {
    ...childElementAttributes,
    ...childCustomAttributes,
    ...customPropsWithEvents,
    ...{
      className: `${childElementAttributes.className || ''} ${childCustomAttributes.className || ''}`,
  }};

  return mergedResult;
};

export const prepareTableOptions = (props: ITableOption) => {
  const {
    extendedFilter,
    groups,
    groupsExpanded,
    search,
  } = props;
  let {
    columns,
    data = [],
  } = props;
  data = extendedFilter ? extendedFilter(data) : data;
  data = search ? searchData(columns, data, search) : data;

  data = convertToColumnTypes(data, columns);

  data = filterData(data, columns);
  data = sortData(columns, data);

  let groupColumnsCount = 0;
  let groupedColumns: Column[] = [];
  if (groups) {
    groupColumnsCount = groups.length;
    groupedColumns = columns.filter((c) => groups.some((g) => g.columnKey === c.key));
    columns = columns.filter((c) => !groups.some((g) => g.columnKey === c.key));
  }

  const groupedData = groups ? getGroupedData(data, groups, groupedColumns, groupsExpanded) : data;

  return {
    columns,
    data,
    groupColumnsCount,
    groupedColumns,
    groupedData,
  };
};
