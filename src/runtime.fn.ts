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
import typeChangeDef from "./_type-change/com.json";
import typeChangeRt from "./_type-change/rt";
import connectorDef from "./_connector/com.json";
import connectorRt from "./_connector/runtime";
import frameInputDef from './frame-input/com.json';
import frameInputRt from './frame-input/runtime';
import _scenesDef from './_scenes/com.json'
import _scenesRt from './_scenes/runtime'
import moduleDef from './module/com.json'
import moduleRt from './module/runtime.fn'


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
    merge({
      comDef: typeChangeDef,
      rt: typeChangeRt
    }),
    merge({
      comDef: connectorDef,
      rt: connectorRt
    }),
    merge({
      comDef: frameInputDef,
      rt: frameInputRt
    }),
    merge({
      comDef: _scenesDef,
      rt: _scenesRt
    }),
    merge({
      comDef: moduleDef,
      rt: moduleRt
    })
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