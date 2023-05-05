/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */
import React, {useCallback, useMemo} from "react";
import css from './runtime.less'

export default function FrameInput({env, data, inputs, outputs}) {
  if (env.runtime) {
    inputs['getCurValue']((val, relOutpus) => {
      relOutpus['return'](val)
    })
  }
}