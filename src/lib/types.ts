import { PropsWithChildren } from 'react';

import { ICellContentProps } from './Components/CellContent/CellContent';
import { ICellEditorProps } from './Components/CellEditor/CellEditor';

export type CellFunc = (props: CellFuncPropsWithChildren) => any;
export type CellFuncPropsWithChildren = PropsWithChildren<ICellContentProps>;
export type DataChangedFunc = (data: any[]) => void;
export type EditorFunc = (props: EditorFuncPropsWithChildren) => any;
export type EditorFuncPropsWithChildren = PropsWithChildren<ICellEditorProps>;
export type OptionChangedFunc = (value: any) => void;
export type RowDataChangedFunc = (data: any) => void;
export type ValidationFunc = (value: any, rowData: any) => string | void;
export type ValueChangeFunc = (newValue: any) => void;
