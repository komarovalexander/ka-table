import React from 'react';

import CellEditorBoolean from '../Components/CellEditorBoolean/CellEditorBoolean';
import CellEditorDate from '../Components/CellEditorDate/CellEditorDate';
import CellEditorNumber from '../Components/CellEditorNumber/CellEditorNumber';
import CellEditorString from '../Components/CellEditorString/CellEditorString';
import { EditorFuncPropsWithChildren } from '../Types/EditorFuncPropsWithChildren';
import { Editors } from './Editors';

const defaultEditors = new Editors();
defaultEditors.checkbox = (props: EditorFuncPropsWithChildren) => (<CellEditorBoolean {...props} />);
defaultEditors.date = (props: EditorFuncPropsWithChildren) => (<CellEditorDate {...props} />);
defaultEditors.number = (props: EditorFuncPropsWithChildren) => (<CellEditorNumber {...props} />);
defaultEditors.text = (props: EditorFuncPropsWithChildren) => (<CellEditorString {...props} />);

export default defaultEditors;
