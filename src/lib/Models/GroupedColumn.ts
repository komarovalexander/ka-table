
export class GroupedColumn {
    /**
     * Unique identifier
     */
    public key!: string;
    /**
     * Used to show text in the cell
     */
    public title?: string;
    /**
     * List of children's keys
     */
    public columnsKeys!: string[];
}
