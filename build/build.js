const fs = require("fs");
const path = require("path");

const componentRoot = path.resolve(__dirname, "../src")
function getComJSON(name) {
  return require(path.resolve(componentRoot, `./${name}/com.json`));
}

function convertToUnderscore(input) {
  return input.replace(/[^a-zA-Z0-9]/g, "_");
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getComponentName({ namespace, rtType }) {
  const lastIndex = namespace.lastIndexOf('.');
  return convertToUnderscore((lastIndex !== -1 ? namespace.substring(lastIndex + 1) : namespace)).split('_').filter((str) => str).reduce((p, c, index) => {
    return p + (rtType?.match(/^js/gi) ? (index ? capitalizeFirstLetter(c) : c) : capitalizeFirstLetter(c));
  }, "");
}

const componentDirNames = ['fn', '_var', '_type-change', '_connector', 'frame-input', '_scenes', 'module', 'group', 'service', 'frame-output', 'ai-js', '_domain', '_bus-user']

let comArayCode = ''
let importCode = ''

componentDirNames.forEach((componentDirName) => {
  const comJSON = getComJSON(componentDirName)
  const name = getComponentName(comJSON) + '0';
  importCode = importCode + `import ${name} from ".${path.join(`/${componentDirName}`, comJSON.runtime.replace(/\.tsx|\.ts/, ""))}"\n`

  // 默认空对象
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(path.resolve(path.resolve(componentRoot, `./${componentDirName}`), comJSON.data), "utf-8"));
  } catch {}
  const inputs = comJSON.inputs ? comJSON.inputs.map(({ id }) => id) : [];
  const outputs = comJSON.outputs ? comJSON.outputs.map(({ id }) => id) : [];
  const isJS = comJSON.rtType?.match(/^js/gi);

  comArayCode = comArayCode + `
  {
    namespace: "${comJSON.namespace}",
    version: "${comJSON.version}",
    runtime: ${name},
    data: ${JSON.stringify(data)},
    inputs: ${JSON.stringify(inputs.concat(isJS ? [] : ['show', 'hide', 'showOrHide']))},
    outputs: ${JSON.stringify(outputs)}
  },`
})

const npmBuildCode = `
${importCode}
export default {
  id: 'mybricks-core-comlib',
  title: 'Mybrics核心组件库',
  author: 'CheMingjun',
  icon: '',
  version: '1.0.1',
  comAray: [
    ${comArayCode}
  ]
}
`

fs.writeFileSync(path.resolve(componentRoot, `npm.ts`), npmBuildCode, 'utf-8')
