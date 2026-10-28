
export default class Demo {
    constructor(
        public component: React.ElementType,
        public path: string,
        public title: string,
        public fileName: string,
        public jsLink: string = '',
        public tsLink: string = '',
        public group: string = '',
        public linkfile: string = '') {
        // a demo without an online editor keeps the empty links
        this.jsLink = jsLink && `${jsLink}?file=${this.linkfile || 'Demo.js'}`;
        this.tsLink = tsLink && `${tsLink}?file=${this.linkfile || 'Demo.tsx'}`;
    }
}
