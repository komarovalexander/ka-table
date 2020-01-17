export class VirtualScrolling {
  public scrollPosition?: number;
  public itemHeight?: ((data: any) => number) | number;
  public tbodyHeight?: number;
}
