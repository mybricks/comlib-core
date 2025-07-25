/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */
// import moduleDef from './module/com.json'
// import moduleRT from './module/runtime'
// import moduleEdt from './module/editors'

import groupDef from './group/com.json'
import groupRT from './group/runtime'
import groupEditors from './group/editors'

import selectionDef from './selection/com.json'
import selectionRT from './selection/runtime'
import selectionEditors from './selection/editors'

import scenesDef from './_scenes/com.json'
import scenesData from './_scenes/data.json'
import scenesRT from './_scenes/runtime'
import scenesEditors from './_scenes/editors'

import moduleComDef from './module/com.json'
import moduleComData from './module/data.json'
import moduleComRT from './module/runtime'
import moduleComEdt from './module/editors'

import frameInputDef from './frame-input/com.json'
import frameInputEditors from './frame-input/editors'
import frameInputRt from './frame-input/runtime'

import frameOutputDef from './frame-output/com.json'
import frameOutputEditors from './frame-output/editors'
import frameOutputRt from './frame-output/runtime'

import fnDef from './fn/com.json'
import Fn from './fn/Fn'

import serviceDef from './service/com.json'
import Service from './service/Service'

import varDef from './_var/com.json'
import VarData from './_var/data.json'
import Var from './_var/Var'
import varEditors from './_var/editors'

import typeChangeDef from './_type-change/com.json'
import typeChangeRt from './_type-change/rt'
import typeChangeEditors from './_type-change/editors'

import connectorDef from './_connector/com.json'
import connectorRt from './_connector/runtime'
import connectorEditors from './_connector/editors'

import aiJSDef from './ai-js/com.json'
import aiJSRt from './ai-js/runtime'
import aiJSEditors from './ai-js/editors'

import domainDef from './_domain/com.json'
import domainRt from './_domain/runtime'
import domainEditors from './_domain/editor'

import popupDef from './popup/com.json'
import popupRt from './popup/runtime'
import popupData from './popup/data.json'
import popupEditors from './popup/editors'

import layoutDef from './layout/com.json'
import layoutRt from './layout/runtime'
import layoutRtEdt from './layout/edit/runtime'
import layoutData from './layout/data.json'
import layoutEditors from './layout/edit/editors'
import {Logo} from './layout/Icons'
import {AIJX, AIJXBase64} from "./Icons";

import busUserDef from './_bus-user/com.json'
import busUserRt from './_bus-user/runtime'
import busUserEditors from './_bus-user/editor'

//import frameOutputDef from './frame-output/com.json'


// import {T_XGraphComDef} from "@sdk";


const lib = {
  id: '@mybricks/comlib-core',
  title: 'MyBricks基础组件库',
  author: 'CheMingjun',
  icon: '',
  version: '1.0.1',
  comAray: [
    // merge({
    //   comDef: popupDef,
    //   data: popupData,
    //   rt: popupRt,
    //   editors: popupEditors
    // }),
    merge({
      comDef: busUserDef,
      rt: busUserRt,
      editors: busUserEditors
    }),
    // merge({
    //   comDef: domainDef,
    //   rt: domainRt,
    //   editors: domainEditors
    // }),
    merge({
      comDef: aiJSDef,
      rt: aiJSRt,
      editors: aiJSEditors,
      icon: AIJXBase64
    }),
    merge({
      comDef: groupDef,
      rt: groupRT,
      editors: groupEditors
    }),
    merge({
      comDef: selectionDef,
      rt: selectionRT,
      editors: selectionEditors
    }),
    merge({
      comDef: scenesDef,
      data: scenesData,
      rt: scenesRT,
      editors: scenesEditors
    }),
    merge({
      comDef: moduleComDef,
      data: moduleComData,
      rt: moduleComRT,
      editors: moduleComEdt
    }),
    merge({
      comDef: frameInputDef,
      editors: frameInputEditors,
      rt: frameInputRt
    }),
    merge({
      comDef: frameOutputDef,
      editors: frameOutputEditors,
      rt: frameOutputRt
    }),
    merge({
      comDef: fnDef,
      rt: Fn
    }),
    merge({
      comDef: serviceDef,
      rt: Service
    }),
    merge({
      comDef: varDef,
      data: VarData,
      rt: Var,
      editors: varEditors
    }),
    // merge({
    //   comDef: moduleDef,
    //   rt: moduleRT,
    //   editors: moduleEdt
    // }),
    merge({
      comDef: typeChangeDef,
      rt: typeChangeRt,
      editors: typeChangeEditors
    }),
    merge({
      comDef: connectorDef,
      rt: connectorRt,
      editors: connectorEditors,
      visibility: false
    }),
    // merge({
    //   comDef: layoutDef,
    //   icon: Logo,
    //   data: layoutData,
    //   rt: layoutRt,
    //   rtEdit: layoutRtEdt,
    //   editors: layoutEditors
    // }),
    // merge({
    //   comDef: frameOutputDef
    // })
    // merge({
    //   xg: moduleXG,
    //   rt: moduleRT,
    //   data: moduleData
    // }),
    // merge({
    //   xg: ifXG,
    //   rt: ifRT
    // }),
    // merge({
    //   xg: forXG,
    //   rt: forRT
    // }),
    // merge({
    //   xg: moduleJoinerXG,
    //   rt: moduleJoinerRT
    // }),
    // merge(dialogInputs),
    // merge(dialogOutputs)
  ],
  //visible: true,
  visible: false//TODO
}

export default lib

export function getCom(namespace: string) {
  return lib.comAray.find(com => com.namespace === namespace)
}

function merge({
                 comDef,
                 icon,
                 rt,
                 rtEdit,
                 data,
                 editors,
                 assistence
               }: {
  comDef, icon?, rt?, data?, editors?, assistence?
}) {
  return Object.assign(comDef, {
    runtime: rt,
    icon: icon,
    'runtime.edit': rtEdit,
    data,
    editors,
    assistence
  })
}