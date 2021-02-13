import { PagingPosition } from '../enums';

export class PagingOptions {
  enabled?: boolean;
  pageIndex?: number;
  pageSize?: number;
  pageSizes?: number[];
  pagesCount?: number;
  position?: PagingPosition;
}
