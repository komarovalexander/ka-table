
export default class Demo {
  constructor(
    public component: React.FC,
    public path: string,
    public title: string,
    public fileName: string,
    public jsLink: string = '',
    public tsLink: string = '') {
  }
}
