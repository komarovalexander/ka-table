
import { RefObject } from 'react';

import { ActionType } from '../enums';
import { ITableAllProps } from '../index';

export const wrapDispatch = (
  tableProps: ITableAllProps,
  theadRef?: RefObject<HTMLTableSectionElement>) => {
  const {
    dispatch,
  } = tableProps;
  return (action: any) => {
    switch (action.type) {
      case ActionType.ScrollTable:
        if (theadRef && theadRef.current) {
          theadRef.current.scrollTo({ left: action.scrollLeft});
        }
    }
    dispatch(action);
  };
};
