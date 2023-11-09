/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */
import {useMemo, useRef} from 'react'

export default function ({env, data, inputs: propsInputs, outputs: propsOutputs}) {
  const _refs = useRef()
  
  const render = useMemo(() => {
    const json = env.getModuleJSON(data.definedId)
    
    return env.renderModule(json, {
      ref(refs) {
        _refs.current = refs
        
        if (env.runtime) {
          const {inputs, outputs} = json
          
          inputs.forEach(({id}) => {
            propsInputs[id]((value) => {
              refs.inputs[id](value)
            })
          })
          
          outputs.forEach(({id}) => {
            refs.outputs(id, propsOutputs[id]);
          })
        }
        
        refs.run()
      },
      /** 禁止主动触发IO、执行自执行计算组件 */
      disableAutoRun: true
    })
  }, [])
  
  useMemo(() => {
    if (_refs.current) {
      const configs = data.configs
      for (let id in configs) {
        _refs.current.inputs[id](configs[id])
      }
    }
  }, [{...data.configs}, _refs.current])
  
  return render
}