
import fn0 from "./fn/Fn"
import var0 from "./_var/Var"
import typeChange0 from "./_type-change/rt"
import connector0 from "./_connector/runtime"
import frameInput0 from "./frame-input/runtime"
import scenes0 from "./_scenes/runtime"
import Module0 from "./module/runtime"
import Group0 from "./group/runtime"

export default {
  id: 'mybricks-core-comlib',
  title: 'Mybrics核心组件库',
  author: 'CheMingjun',
  icon: '',
  version: '1.0.1',
  comAray: [
    
  {
    namespace: "mybricks.core-comlib.fn",
    version: "1.0.0",
    runtime: fn0,
    data: {},
    inputs: [],
    outputs: []
  },
  {
    namespace: "mybricks.core-comlib.var",
    version: "1.0.0",
    runtime: var0,
    data: {},
    inputs: ["get","set","reset"],
    outputs: ["return","changed"]
  },
  {
    namespace: "mybricks.core-comlib.type-change",
    version: "1.0.0",
    runtime: typeChange0,
    data: {},
    inputs: ["from"],
    outputs: ["to"]
  },
  {
    namespace: "mybricks.core-comlib.connector",
    version: "1.0.0",
    runtime: connector0,
    data: {},
    inputs: ["call"],
    outputs: ["then","catch"]
  },
  {
    namespace: "mybricks.core-comlib.frame-input",
    version: "1.0.0",
    runtime: frameInput0,
    data: {},
    inputs: ["getCurValue"],
    outputs: ["return"]
  },
  {
    namespace: "mybricks.core-comlib.scenes",
    version: "1.0.0",
    runtime: scenes0,
    data: {},
    inputs: ["open"],
    outputs: []
  },
  {
    namespace: "mybricks.core-comlib.module",
    version: "1.0.0",
    runtime: Module0,
    data: {},
    inputs: ["show","hide","showOrHide"],
    outputs: []
  },
  {
    namespace: "mybricks.core-comlib.group",
    version: "1.0.0",
    runtime: Group0,
    data: {},
    inputs: ["show","hide","showOrHide"],
    outputs: ["click","dblClick"]
  },
  ]
}