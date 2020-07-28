
import { DataType, SortDirection } from '../enums';
import { CssClasses } from './CssClasses';

class DefaultOptions {
  public columnDataType = DataType.String;
  public columnSortDirection: SortDirection = SortDirection.Ascend;
  public css: CssClasses = new CssClasses();
}

const kaDefaultOptions = new DefaultOptions();

export { kaDefaultOptions };
