export class VirtualScrolling {
    public enabled?: boolean;
    public scrollTop?: number;
    public itemHeight?: ((data: any) => number) | number;
    public tbodyHeight?: number;
    public bottomInvisibleCount?: number;
    public topInvisibleCount?: number;
}
