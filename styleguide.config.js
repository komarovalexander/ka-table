const path = require('path');
module.exports = {
  title: "React Table Component",
  styleguideDir: "docs",
  pagePerSection: true,
  usageMode: 'expand',
  sections: [
    {
      name: 'Table',
      components: ['./src/Components/Table/Table.tsx']
    },		
    {
      name: 'Options',      
      sections: [{        
        name: 'Columns',
        content: 'src/Models/Column.md',
        description: 'This is the Columns section description',
      }],
      sectionDepth: 2 
    }
	],
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, path.extname(componentPath));
    return `import { ${name} } from '@someurls';`;
  },
  propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json', {
    propFilter: {
      skipPropsWithoutDoc: false
    }
  }).parse
}