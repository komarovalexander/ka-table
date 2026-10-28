import { Cell } from './Cell';

export class Focused {
    public cell?: Cell;
    public cellEditorInput?: Cell;
    // the key of the focused group row (keyboardNavigation)
    public group?: unknown[];
}
