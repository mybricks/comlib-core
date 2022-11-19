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

import varDef from './_var/com.json'
import Var from './_var/Var'

// import moduleDef from './module/com.json'
// import moduleRT from './module/runtime'
import typeChangeDef from "./_type-change/com.json";
import typeChangeRt from "./_type-change/rt";
import connectorDef from "./_connector/com.json";
import connectorRt from "./_connector/runtime";


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