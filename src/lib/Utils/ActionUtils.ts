
import { RefObject } from 'react';

import { ActionType } from '../enums';
import { ITableAllProps } from '../index';
import { kaReducer } from '../reducers';

export const wrapDispatch = (
  tableProps: ITableAllProps,
  theadRef?: RefObject<HTMLTableSectionElement>) => {
  const {
    onDataChange = () => {},
    onEvent = () => {},
    onOptionChange = () => {},
    onDispath,
    childAttributes,
    ...state
  } = tableProps;
  const {
    virtualScrolling,
  } = state;
  let lastState = {...state};
  if (onDispath) {
    return (action: any, actionData: any) => {
      if (actionData) {
        action = { type: action, ...actionData };
      }
      switch (action.type) {
        case ActionType.ScrollTable:
          if (theadRef && theadRef.current) {
            theadRef.current.scrollTo({ left: action.scrollLeft});
          }
      }
      onDispath(action);
    };
  } else if (onOptionChange) {
    return (action: any, actionData: any) => {
      if (actionData) {
        action = { type: action, ...actionData };
      }
      lastState = kaReducer(lastState, action, actionData);

      switch (action.type) {
        case ActionType.OpenEditor:
        case ActionType.CloseEditor:
          onOptionChange({ editableCells: lastState.editableCells });
          break;
        case ActionType.ChangeSorting:
        case ActionType.ChangeFilterRow:
          onOptionChange({ columns: lastState.columns });
          break;
        case ActionType.ChangeRowData:
          onOptionChange({ data: lastState.data });
          onDataChange(lastState.data!);
          break;
        case ActionType.DeselectAllRows:
        case ActionType.DeselectRow:
        case ActionType.DeselectRowData:
        case ActionType.SelectAllRows:
        case ActionType.SelectRow:
        case ActionType.SelectSingleRow:
          onOptionChange({ selectedRows: lastState.selectedRows });
          break;
        case ActionType.ChangeVirtualScrollingHeightSettings:
          onOptionChange({ virtualScrolling: action.virtualScrolling });
          break;
        case ActionType.ScrollTable:
          if (theadRef && theadRef.current) {
            theadRef.current.scrollTo({ left: action.scrollLeft});
          }
          if (virtualScrolling) {
            onOptionChange({ virtualScrolling: lastState.virtualScrolling});
          }
          break;
        case ActionType.UpdateGroupsExpanded:
          actionData.newValue = { groupsExpanded: lastState.groupsExpanded }; // BC
          onOptionChange({ groupsExpanded: lastState.groupsExpanded });
          break;
      }
      onEvent(action.type, actionData);
    };
  } else {
    return (action: any) => {};
  }
};
