import { ReactNode } from 'react';

import { ICellEditorProps } from '../Components/CellEditor/CellEditor';

export type PropsWithChildren<P> = P & { children?: ReactNode };
export type EditorFuncPropsWithChildren = PropsWithChildren<ICellEditorProps>;
