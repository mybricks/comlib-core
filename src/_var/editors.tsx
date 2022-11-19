/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */
import {uuid} from "../util";

interface Result {
  focusArea: any
  slot: any
  data: any
  output: any
  input: any
}

export default {
  // '@inputConnected': ({data, input, output, setAutoRun, isAutoRun}
  //   , from: { id, title, schema, parent }
  //   , to: { id, title, schema, parent }) => {
  //   if (to.id === 'set') {
  //     debugger
  //
  //     const returnPin = output.get('return')
  //     returnPin.setSchema(from.schema)//follow
  //
  //     const changedPin = output.get('changed')
  //     changedPin.setSchema(from.schema)//follow
  //   }
  // },
  '@inputUpdated': ({data, input, output, setAutoRun, isAutoRun}
    , {id, title, schema}) => {
    if (id === 'set') {
      const returnPin = output.get('return')
      returnPin.setSchema(schema)//follow

      const changedPin = output.get('changed')
      changedPin.setSchema(schema)//follow
    }
  },
  '@inputDisConnected': ({data, input, output, setAutoRun, isAutoRun}
    , from: { id, title, schema, parent }
    , to: { id, title, schema, parent }) => {
    if (to.id === 'set') {
      const returnPin = output.get('return')
      returnPin.setSchema({type: 'unknown'})

      const changedPin = output.get('changed')
      changedPin.setSchema({type: 'unknown'})
    }
  },
  ':root': [
    // {
    //   title: '赋值',
    //   type: 'switch',
    //   value: {
    //     set({data, input}: Result) {
    //       console.log(data)
    //       debugger
    //     }
    //   }
    // }
  ]
}



