import React from 'react';

import { DataType } from '../../enums';
import { IFilterRowEditor } from '../CellEditor/CellEditor';
import FilterRowNumber from '../FilterRowNumber/FilterRowNumber';
import FilterRowString from '../FilterRowString/FilterRowString';

const FilterRowDataType: React.FunctionComponent<IFilterRowEditor> = (props) => {
  switch (props.column.dataType) {
    // case DataType.Boolean: return <CellEditorBoolean {...props} />;
    // case DataType.Date: return <CellEditorDate {...props} />;
    case DataType.Number: return <FilterRowNumber {...props} />;
    default: return <FilterRowString {...props} />;
  }
};

export default FilterRowDataType;
