
import { DataType, SortDirection } from './enums';
import { CssClasses } from './Models/CssClasses';

class DefaultOptions {
  public columnDataType = DataType.String;
  public columnSortDirection: SortDirection = SortDirection.Ascend;
  public css: CssClasses = new CssClasses();
}

const defaultOptions = new DefaultOptions();

export default defaultOptions;
