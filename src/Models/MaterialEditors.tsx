import React from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { Checkbox, Input } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { Editors } from './Editors';

const materialEditors = new Editors();
materialEditors.checkbox = ({rowData, column, onValueChange, close }) => {
  return (
  <Checkbox
    checked={rowData[column.field]}
    onChange={(event: any) => onValueChange(event.currentTarget.checked)}
    onBlur={close}
    />
  );
};

materialEditors.date = ({rowData, column, onValueChange, close }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        value={new Date(rowData[column.field])}
        variant='inline'
        open={true}
        onChange={(value: any) => {
          onValueChange(new Date(value));
        }}
        onClose={close}
        />
    </MuiPickersUtilsProvider>
  );
};

materialEditors.number = ({rowData, column, onValueChange, close }) => {
  return (
    <Input autoFocus={true}
        defaultValue={rowData[column.field]}
        type='number'
        onChange={(event) => onValueChange(event.currentTarget.value)}
        onBlur={close}
      />
  );
};

materialEditors.text = ({rowData, column, onValueChange, close }) => {
  return (
    <Input autoFocus={true}
        defaultValue={rowData[column.field]}
        type='text'
        onChange={(event) => onValueChange(event.currentTarget.value)}
        onBlur={close}
      />
  );
};

export default materialEditors;
