/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */

export default function ({env, data, inputs: propsInputs, outputs: propsOutputs}) {
  const json = env.getModuleJSON(data.definedId)
    
  return env.renderModule(json, {
    ref(refs) {
      const {inputs, outputs} = json
        
      inputs.forEach(({id}) => {
        propsInputs[id]((value) => {
          refs.inputs[id](value)
        })
      })
      
      outputs.forEach(({id}) => {
        refs.outputs(id, propsOutputs[id]);
      })

      const configs = data.configs

      for (let id in configs) {
        refs.inputs[id](configs[id])
      }
      
      refs.run()
    },
    /** 禁止主动触发IO、执行自执行计算组件 */
    disableAutoRun: true
  })
}