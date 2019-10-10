
import { DataType } from '../Enums/DataType';
import { SortDirection } from '../Enums/SortDirection';
import { CssClasses } from './CssClasses';

class DefaultOptions {
  public columnDataType = DataType.String;
  public columnSortDirection: SortDirection = SortDirection.Ascend;
  public css: CssClasses = new CssClasses();
}

const defaultOptions = new DefaultOptions();

export default defaultOptions;
