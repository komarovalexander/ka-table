
export default class Demo {
  constructor(
    public component: React.ElementType,
    public path: string,
    public title: string,
    public fileName: string,
    public jsLink: string = '',
    public tsLink: string = '',
    public group: string = '') {
      this.jsLink = jsLink + '?file=Demo.js';
      this.tsLink = tsLink + '?file=Demo.tsx';
  }
}
