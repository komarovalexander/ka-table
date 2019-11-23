export class VirtualScrolling {
  public itemHeight!: (data: any) => number | number;
  public scrollPosition?: number;
  public visibleItemsCount?: number;
}
