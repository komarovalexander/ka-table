
import { RefObject } from 'react';

import { ActionType } from '../enums';
import { ITableAllProps } from '../index';
import { defaultReducer } from '../reducers';

export const wrapDispatch = (
  tableProps: ITableAllProps,
  theadRef?: RefObject<HTMLTableSectionElement>) => {
  const {
    onDataChange = () => {},
    onEvent = () => {},
    onOptionChange = () => {},
    childAttributes,
    ...state
  } = tableProps;
  const {
    virtualScrolling,
  } = state;
  let lastState = {...state};
  return (action: string, actionData: any) => {
    lastState = defaultReducer(lastState, action, actionData);

    switch (action) {
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
        onOptionChange(actionData);
        break;
      case ActionType.ScrollTable:
        if (theadRef && theadRef.current) {
          theadRef.current.scrollTo({ left: actionData.scrollLeft});
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
    onEvent(action, actionData);
  };
};
