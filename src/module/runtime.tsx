/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */
import {useMemo, useState} from 'react'

export default function ({env, data, style, inputs: propsInputs, outputs: propsOutputs}) {
  const [refs, setRefs] = useState()
  
  const render = useMemo(() => {
    const json = env.getModuleJSON(data.definedId)
    
    return env.renderModule(json, {/////TODO 放大的情况下多组件对齐、slot的参考线问题
      ref(refs) {
        setRefs(refs)
        
        if (env.edit) {
          const refStyle = refs.style
          if (refStyle) {
            style.widthAuto = refStyle.widthAuto
            style.widthFull = refStyle.widthFull
            
            style.heightAuto = refStyle.heightAuto
            style.heightFull = refStyle.heightFull
          }
        }
        
        if (env.runtime) {
          const {inputs, outputs} = json
          const configs = data.configs
          
          for (let id in configs) {
            refs.inputs[id](configs[id])
          }
          
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
    if (refs && env.edit) {
      const configs = data.configs
      
      for (let id in configs) {
        refs.inputs[id](configs[id])
      }
    }
  }, [data.configs, refs])
  
  return render
}