/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */

export default function FrameInput({env, data, inputs, outputs}) {
  if (env.runtime) {
    inputs['getCurValue']((val, relOutpus) => {
      let clonedVal
      if (val && typeof val === 'object') {
        clonedVal = JSON.parse(JSON.stringify(val))//防止后续数据修改
      } else {
        clonedVal = val
      }
      
      relOutpus['return'](clonedVal)
    })
  }
}