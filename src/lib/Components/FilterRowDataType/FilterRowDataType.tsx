import React from 'react';

import { DataType } from '../../enums';
import { IFilterRowEditorProps } from '../../props';
import FilterRowBoolean from '../FilterRowBoolean/FilterRowBoolean';
import FilterRowDate from '../FilterRowDate/FilterRowDate';
import FilterRowNumber from '../FilterRowNumber/FilterRowNumber';
import FilterRowString from '../FilterRowString/FilterRowString';

const FilterRowDataType: React.FunctionComponent<IFilterRowEditorProps> = (props) => {
  switch (props.column.dataType) {
    case DataType.Boolean: return <FilterRowBoolean {...props} />;
    case DataType.Date: return <FilterRowDate {...props} />;
    case DataType.Number: return <FilterRowNumber {...props} />;
    default: return <FilterRowString {...props} />;
  }
};

export default FilterRowDataType;
