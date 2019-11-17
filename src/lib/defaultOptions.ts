
import { DataType, SortDirection } from './enums';
import { CssClasses } from './Models/CssClasses';

const cssClasses = new CssClasses();
cssClasses.table = 'tc-table';
cssClasses.thead = 'tc-thead';
cssClasses.theadRow = 'tc-thead-row';
cssClasses.theadCell = 'tc-thead-cell';
cssClasses.row = 'tc-row';
cssClasses.cell = 'tc-cell';
class DefaultOptions {
  public columnDataType = DataType.String;
  public columnSortDirection: SortDirection = SortDirection.Ascend;
  public css: CssClasses = cssClasses;
}

const defaultOptions = new DefaultOptions();

export default defaultOptions;
