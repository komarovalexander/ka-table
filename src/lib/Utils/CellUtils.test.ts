import { ActionType, EditingMode } from '../enums';
import {
    addItemToEditableCells,
    checkPopupPosition,
    getCellEditorDispatchHandler,
    getEditableCell,
    getNewRowDataFromEditableCells,
    isEditableCell,
    removeItemFromEditableCells,
} from './CellUtils';
import { closeEditor, updateEditorValue, updatePopupPosition } from '../actionCreators';

import { EditableCell } from '../models';
import { PopupPosition } from '../Models/PopupPosition';

describe('CellUtils', () => {
    it('isEditableCell equals true', () => {
        const rowEditableCells = isEditableCell(EditingMode.Cell, { key: 'column' }, [{
            columnKey: 'column',
            rowKeyValue: 10,
        }]);
        expect(rowEditableCells).toBeTruthy();
    });

    it('isEditableCell equals false', () => {
        const rowEditableCells = isEditableCell(EditingMode.Cell, { key: 'column2' }, [{
            columnKey: 'column',
            rowKeyValue: 10,
        }]);
        expect(rowEditableCells).toBeFalsy();
    });

    it('isEditableCell equals false if column.isEditable is false', () => {
        const rowEditableCells = isEditableCell(EditingMode.Cell, { key: 'column', isEditable: false }, [{
            columnKey: 'column',
            rowKeyValue: 10,
        }]);
        expect(rowEditableCells).toBeFalsy();
    });

    it('getEditableCell return undefined if column.isEditable is false', () => {
        const editableCell = getEditableCell({ key: 'column', isEditable: false }, [{
            columnKey: 'column',
            rowKeyValue: 10,
        }]);
        expect(editableCell).toBeUndefined();
    });

    describe('CellHandlers', () => {
        it('addItemToEditableCells', () => {
            const editableCells: EditableCell[] = [{
                columnKey: 'column',
                rowKeyValue: 1,
            }];
            const item: EditableCell = {
                columnKey: 'column2',
                rowKeyValue: 2,
            };
            const newEditableCells = addItemToEditableCells(item, editableCells);
            expect(newEditableCells).toMatchSnapshot();
        });

        it('removeItemFromEditableCells', () => {
            const editableCells: EditableCell[] = [{
                columnKey: 'column',
                rowKeyValue: 1,
            }, {
                columnKey: 'column2',
                rowKeyValue: 2,
            }, {
                columnKey: 'column',
                rowKeyValue: 2,
            }];
            const item: EditableCell = {
                columnKey: 'column2',
                rowKeyValue: 2,
            };
            const newEditableCells = removeItemFromEditableCells(item, editableCells);
            expect(newEditableCells).toMatchSnapshot();
        });
    });
    describe('getCellEditorDispatchHandler', () => {
        it('transform UpdateEditorValue to UpdateCellValue', () => {
            const dispatch = vi.fn();
            const dispatchHandler = getCellEditorDispatchHandler(dispatch);
            dispatchHandler(updateEditorValue(1, 'column', 2));
            expect(dispatch).toHaveBeenCalledWith({
                columnKey: 'column',
                rowKeyValue: 1,
                type: ActionType.UpdateCellValue,
                value: 2,
            });
        });

        it('pass action to dispatch', () => {
            const dispatch = vi.fn();
            const dispathcHandler = getCellEditorDispatchHandler(dispatch);
            const action = closeEditor(1, 'column');
            dispathcHandler(action);
            expect(dispatch).toHaveBeenCalledWith(action);
        });
    });
    describe('getNewRowDataFromEditableCells', () => {
        it('default', () => {
            const editableCells: EditableCell[] = [
                {
                    columnKey: 'column1',
                    rowKeyValue: 1,
                    editorValue: 11,
                },
                {
                    columnKey: 'column2',
                    rowKeyValue: 1,
                    editorValue: 22,
                },
                {
                    columnKey: 'column3',
                    rowKeyValue: 1,
                },
            ];
            const result = getNewRowDataFromEditableCells(editableCells, [
                {
                    key: 'column1',
                },
                {
                    key: 'column2',
                },
                {
                    key: 'column3',
                },
            ]);
            expect(result).toEqual({ column1: 11, column2: 22 });
        });
    });
});

it('should dispatch the action', () => {
    const dispatch = vi.fn();
    const popupPosition: PopupPosition = {
        x: 0,
        y: 0
    }
    const dispatchHandler = getCellEditorDispatchHandler(dispatch);
    dispatchHandler(updatePopupPosition(popupPosition));
    expect(dispatch).toHaveBeenCalledWith({
        popupPosition,
        type: ActionType.UpdatePopupPosition
    });
});

describe('checkPopupPosition', () => {
    const createHeadCellContent = () => {
        const tableWrapper = document.createElement('div');
        tableWrapper.className = 'ka-table-wrapper';
        const headCell = tableWrapper.appendChild(document.createElement('table')).appendChild(document.createElement('th'));
        const element = headCell.appendChild(document.createElement('div'));
        Object.defineProperty(element, 'offsetParent', { value: headCell });
        return element;
    };

    it('dispatches the popup position', () => {
        const dispatch = vi.fn();
        checkPopupPosition({ key: 'name', isHeaderFilterPopupShown: true }, { current: createHeadCellContent() }, dispatch);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(updatePopupPosition({ x: 0, y: 0 }));
    });
    it('does not dispatch if the position is not changed', () => {
        const dispatch = vi.fn();
        checkPopupPosition({
            headerFilterPopupPosition: { x: 0, y: 0 },
            isHeaderFilterPopupShown: true,
            key: 'name',
        }, { current: createHeadCellContent() }, dispatch);
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('does not dispatch if the popup is not shown', () => {
        const dispatch = vi.fn();
        checkPopupPosition({ key: 'name' }, { current: createHeadCellContent() }, dispatch);
        expect(dispatch).not.toHaveBeenCalled();
    });
});
