
import typescript from 'rollup-plugin-typescript';

const config = {
    input: 'src/Components/Table/Table.tsx',
    external: ['react'],
    output: {
        name: 'react-table-control',
        format: 'umd',
        globals: {
            react: "React"
        }
    },
    plugins: [
        typescript(),
    ]
}
export default config
