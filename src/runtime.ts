/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */
import fnDef from './fn/com.json'
import Fn from './fn/Fn'

import varDef from './var/com.json'
import Var from './var/Var'

// import moduleDef from './module/com.json'
// import moduleRT from './module/runtime'
import typeChangeDef from "./type-change/com.json";
import typeChangeRt from "./type-change/rt";
import connectorDef from "./connector/com.json";
import connectorRt from "./connector/runtime";


const lib = {
  id: 'mybricks-core-comlib',
  title: 'Mybrics核心组件库',
  author: 'CheMingjun',
  icon: '',
  version: '1.0.1',
  comAray: [
    merge({
      comDef: fnDef,
      rt: Fn
    }),
    merge({
      comDef: varDef,
      rt: Var
    }),
    // merge({
    //   comDef: moduleDef,
    //   rt: moduleRT
    // }),
    merge({
      comDef: typeChangeDef,
      rt: typeChangeRt
    }),
    merge({
      comDef: connectorDef,
      rt: connectorRt
    }),
  ]
}

export default lib

export function getCom(namespace: string) {
  return lib.comAray.find(com => com.namespace === namespace)
}

function merge({comDef, rt, data}: { comDef, rt, data? }) {
  return Object.assign(comDef, {
    runtime: rt,
    data
  })
}