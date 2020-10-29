import { EditingMode } from '../enums';

export const isCellEditingMode = (editingMode?: EditingMode): boolean => {
  return !!editingMode && (
    editingMode === EditingMode.Cell
      || editingMode === EditingMode.CellUpdateOnChange
  );
};
