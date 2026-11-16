import { Cell } from './Cell';

export class EditableCell extends Cell {
    /**
     * Value of the editor
     */
    public editorValue?: unknown;
    /**
     * Validation message of the column
     */
    public validationMessage?: string;
}
