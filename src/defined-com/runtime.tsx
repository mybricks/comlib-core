/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */
import css from './css.less'
import {useMemo, useState} from "react";

export default function ({env, data, slots}) {
  const jsx = env.renderCom(data.toJSON)

  return (
    <div>
      {jsx}
    </div>
  )
}