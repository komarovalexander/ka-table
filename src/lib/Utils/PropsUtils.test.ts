import { HTMLAttributes } from 'react';

import { EditingMode } from '../enums';
import { ChildAttributesItem, ChildProps } from '../types';
import { mergeProps } from './PropsUtils';

describe('PropsUtils', () => {
  it('mergeProps', () => {
    const childElementAttributes: HTMLAttributes<HTMLElement> = {
      className: 'custom',
      onClick: () => {},
      onDoubleClick: () => {},
    };

    const childProps: ChildProps = {
      column: { key: 'column' },
      dispatch: () => {},
      editingMode: EditingMode.Cell,
      field: 'column',
      rowData: { column: 1, column2: 2, id: 0 },
      rowKeyField: 'id',
    };

    const childCustomAttributes: ChildAttributesItem = {
      onClick: jest.fn(),
    };
    const props = mergeProps(childElementAttributes, childProps, childCustomAttributes);
    const e: any = {name: 'eventName'};
    props.onClick!(e);
    expect(childCustomAttributes.onClick).toHaveBeenCalledTimes(1);
    expect(childCustomAttributes.onClick).toHaveBeenCalledWith(e, {
      baseFunc: childElementAttributes.onClick,
      childElementAttributes,
      childProps,
      dispatch: childProps.dispatch,
    });
  });
});
