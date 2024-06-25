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
          const { inputs, outputs, pinRels } = json
          const inputNextIdMap = {}
          const relOutputIdMap = {}

          Object.entries(pinRels).forEach(([inputId, relOuputId]) => {
            const id = inputId.split("_rootFrame_-")[1]
            if (id) {
              // 输入关联输出
              const outputId = relOuputId[0]
              inputNextIdMap[id] = outputId
              relOutputIdMap[outputId] = true
            }
          })

          const configs = data.configs
          
          for (let id in configs) {
            refs.inputs[id](configs[id])
          }

          outputs.forEach(({id}) => {
            if (!relOutputIdMap[id]) {
              refs.outputs(id, propsOutputs[id]);
            }
          })
          
          inputs.forEach(({id}) => {
            propsInputs[id]((value, relOutputs) => {
              const outputId = inputNextIdMap[id];
              if (outputId) {
                refs.outputs(outputId, (value) => {
                  relOutputs[outputId](value)
                })
              }
              refs.inputs[id](value);
            })
          })
        }
        
        refs.run()
      },
      /** 禁止主动触发IO、执行自执行计算组件 */
      disableAutoRun: true,
      outputs:propsOutputs
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