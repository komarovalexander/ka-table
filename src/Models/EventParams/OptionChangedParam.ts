/**
 * Passed to OptionChangedFunc once ITableOption option is changed
 */
export class OptionChangedParam {
  /**
   * Name of option which was changed
   */
  public name!: string;
  /**
   * New value of the changed option
   */
  public value!: any;
}
