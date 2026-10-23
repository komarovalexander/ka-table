
export class Group {
    public columnKey!: string;
    public enableSummary?: boolean;
    /**
     * false keeps the settings of the group without grouping the rows: the group is enabled when its column is grouped
     * (e.g. dropped on the group panel). Ungrouping disables a group with settings instead of removing it
     */
    public enabled?: boolean;
}
