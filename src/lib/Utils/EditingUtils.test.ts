import { EditingMode } from '../enums';
import { isCellEditingMode } from './EditingUtils';

it('isCellEditingMode', () => {
  expect(isCellEditingMode(EditingMode.Cell)).toBeTruthy();
  expect(isCellEditingMode(EditingMode.CellUpdateOnChange)).toBeTruthy();
  expect(isCellEditingMode(EditingMode.None)).toBeFalsy();
  expect(isCellEditingMode()).toBeFalsy();
});
