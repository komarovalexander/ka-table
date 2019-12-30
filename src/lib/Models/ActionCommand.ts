export class ActionCommand {
  private rejectedFlag: boolean = false;
  get rejected() {
    return this.rejectedFlag;
  }
  public reject(): void {
    this.rejectedFlag = true;
  }
}
