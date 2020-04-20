import { IPagingProps } from '../Components/Paging/Paging';
import { getPagesCount } from './PagingUtils';

describe('PagingUtils', () => {
  it('getPagesCount', () => {
    const paging: IPagingProps = {
      enabled: true,
      pageSize: 2,
    };
    const data = [1,2,3,4,5,6];

    const result = getPagesCount(data, paging);
    expect(result).toEqual(3);
  });

  it('getPagesCount - math ceil should be used', () => {
    const paging: IPagingProps = {
      enabled: true,
      pageSize: 2,
    };
    const data = [1,2,3,4,5,6,7];

    const result = getPagesCount(data, paging);
    expect(result).toEqual(4);
  });

  it('getPagesCount if enabled = false', () => {
    const paging: IPagingProps = {
      enabled: false,
      pageSize: 2,
    };
    const data = [1,2,3,4,5,6];

    const result = getPagesCount(data, paging);
    expect(result).toEqual(1);
  });

  it('getPagesCount default pageSize is 10', () => {
    const paging: IPagingProps = {
      enabled: true,
    };
    const data = new Array(20);

    const result = getPagesCount(data, paging);
    expect(result).toEqual(2);
  });
});
