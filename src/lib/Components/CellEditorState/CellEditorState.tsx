import { ActionType, EditingMode } from '../../enums';
import React, { useCallback, useEffect, useState } from 'react';
import { closeEditor, updateEditorValue } from '../../actionCreators';

import CellEditorValidation from '../CellEditorValidation/CellEditorValidation';
import { DispatchFunc } from '../../types';
import { ICellEditorProps } from '../../props';
import { addEscEnterKeyEffect } from '../../Utils/EffectUtils';
import { getValidationValue } from '../../Utils/Validation';
import { newRowId } from '../../const';
import { replaceValue } from '../../Utils/DataUtils';

const CellEditorState: React.FunctionComponent<ICellEditorProps> = (props) => {
    const {
        column,
        dispatch,
        editingMode,
        rowData,
        rowKeyValue,
        validation,
        value,
    } = props;
    let {
        validationMessage
    } = props;
    const [rowDataState, changeRowData] = useState(rowData);
    const [editorValueState, changeEditorValue] = useState(value);
    const isCellEditingMode = editingMode === EditingMode.Cell;
    validationMessage = rowKeyValue === newRowId || isCellEditingMode || validationMessage
        ? getValidationValue(editorValueState, rowDataState, column, validation) || ''
        : validationMessage;
    const onValueStateChange = (action: any): void => {
        const newRowValue = replaceValue(rowData, column, action.value);
        changeRowData(newRowValue);
        changeEditorValue(action.value);
    };

    const close = useCallback(() => {
        dispatch(closeEditor(rowKeyValue, column.key));
    }, [dispatch, column, rowKeyValue]);

    const closeHandler = useCallback(() => {
        if (!isCellEditingMode || !validationMessage) {
            if (editorValueState !== value) {
                dispatch(updateEditorValue(rowKeyValue, column.key, editorValueState));
            }
            if (isCellEditingMode){
                close();
            }
        }
    }, [validationMessage, dispatch, close, column, editorValueState, rowKeyValue, value, isCellEditingMode]);

    useEffect(() => {
        return addEscEnterKeyEffect(close, closeHandler);
    }, [close, closeHandler]);

    const dispatchHandler: DispatchFunc = (action: any) => {
        if (action.type === ActionType.CloseEditor) {
            closeHandler();
        } else if (action.type === ActionType.UpdateCellValue) {
            onValueStateChange(action);
        } else {
            dispatch(action);
        }
    };

    const stateProps: ICellEditorProps = { ...props, ...{
        dispatch: dispatchHandler,
        value: editorValueState,
        editorValue: editorValueState,
        rowData: rowDataState,
        validationMessage: validationMessage || undefined
    }};

    return (
        <CellEditorValidation {...stateProps} />
    );
};

export default CellEditorState;
