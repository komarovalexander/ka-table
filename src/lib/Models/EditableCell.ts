import { Cell } from './Cell';

export class EditableCell extends Cell {
    public editorValue?: unknown;
    public validationMessage?: string;
}
