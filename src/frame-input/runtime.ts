/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */
export default function FrameInput({env, inputs}) {
  if (env.runtime) {
    inputs['getCurValue']((val, relOutpus) => {
      relOutpus['return'](val)
    })
  }
}