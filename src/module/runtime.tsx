/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */
import css from './css.less'

export default function ({env, data, slots}) {
  if (env.runtime) {
    const names = Object.keys(slots)
    const slotName = names[0]

    // Object.values(frames).forEach(frame => {
    //   frame(void 0,slotName)
    // })

    return slots[slotName].render(null, slotName)
  }
}