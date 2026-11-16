import { CustomAction, TableAction } from '../types';

import { ActionType } from '../enums';

const tableActionTypes = new Set<string>(Object.values(ActionType));

// the actions of the code which uses the table have other types
export const isTableAction = (action: TableAction | CustomAction): action is TableAction => tableActionTypes.has(action.type);
