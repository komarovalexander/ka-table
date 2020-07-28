import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const plugins = [
  typescript({
    typescript: require("typescript"),
  }),
];

const config = [];
const files = ['index', 'enums', 'utils', 'const', 'actionCreators', 'kaDefaultOptions'];

files.forEach(file=>{
  config.push({
    input: `src/lib/${file}.ts`,
    output: {
      file: `dist/${file}.esm.js`,
      format: "esm",
      sourcemap: true,
    },
    plugins,
  });
  config.push({
    input: `src/lib/${file}.ts`,
    output: {
      file: `dist/${file}.js`,
      format: "cjs",
      sourcemap: true,
    },
    plugins,
  });
});

export default config;