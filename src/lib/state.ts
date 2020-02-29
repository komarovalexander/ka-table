
import { ITableAllProps } from './';
import { OptionChangeFunc } from './types';

class TableStateStore {
  private state: any;
  private changeState: any;

  public useState([state, changeState]: [ITableAllProps, (tableOption: ITableAllProps) => any]) {
    this.state = state;
    this.changeState = changeState;
  }

  public onOptionChange: OptionChangeFunc = (value) => {
    this.state = {...this.state, ...value };
    this.changeState(this.state);
  }

  public getState(): ITableAllProps {
    return this.state;
  }

}

export { TableStateStore };
