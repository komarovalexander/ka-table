
import { DataType } from '../Enums/DataType';
import { SortDirection } from '../Enums/SortDirection';
import { CssClasses } from './CssClasses';
import defaultEditors from './DefaultEditors';
import { Editors } from './Editors';

class DefaultOptions {
  public columnDataType = DataType.String;
  public columnSortDirection: SortDirection = SortDirection.Ascend;
  public css: CssClasses = new CssClasses();
  public editors: Editors = defaultEditors;
}

const defaultOptions = new DefaultOptions();

export default defaultOptions;
