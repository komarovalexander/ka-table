
export class Group {
    /**
     * The key of the grouped column
     */
    public columnKey!: string;
    /**
     * Enable summary row for the group
     */
    public enableSummary?: boolean;
    /**
     * false keeps the settings of the group without grouping the rows: the group is enabled when its column is grouped
     * (e.g. dropped on the group panel). Ungrouping disables a group with settings instead of removing it
     *
     * Skip such groups in the code which reads `groups`
     */
    public enabled?: boolean;
}
