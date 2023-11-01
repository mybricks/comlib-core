/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */
import { useMemo } from 'react'

export default function ({ env, data, inputs: propsInputs, outputs: propsOutputs }) {
  const render = useMemo(() => {
    const json = env.getDefinedComJSON(data.definedId)



    return env.renderCom(json, {
      ref(refs) {
        if (env.runtime) {
          const { inputs, outputs } = json

          inputs.forEach(({ id }) => {
            propsInputs[id]((value) => {
              refs.inputs[id](value)
            })
          })
  
          outputs.forEach(({ id }) => {
            refs.outputs(id, propsOutputs[id]);
          })
        }

        refs.run()
      },
      /** 禁止主动触发IO、执行自执行计算组件 */
      disableAutoRun: true
    })
  }, [])

  return render
}