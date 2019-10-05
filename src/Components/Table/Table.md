
    import React, { useState } from 'react';

    const dataArray = [];
    for (let index = 0; index < 10; index++) {
      dataArray.push({ column: index + '1', column2: index + '2', id: index });
    }

    const tableProps = {
      columns: [
        { key: 'id', name: 'Id' },
        { key: 'column', name: 'Column 1' },
        { key: 'column2', name: 'Column 2' },
      ],
      rowKey: 'id',
    };
    
    const [option, changeOptions] = useState(tableProps);
    const onOptionChanged = (newOption) => {
      changeOptions({...option, ...newOption.value });
    };

    <Table
      {...option}      
      data={dataArray}
      onOptionChanged={onOptionChanged}
    />
