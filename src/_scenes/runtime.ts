export default function ({env, data, inputs, _inputs, _inputsCallable}) {
//   _inputs['_open'](() => {
// debugger
//   })

  inputs['open'](params => {
    env.openScene(data.sceneId, params,data.openType)

    _inputsCallable['_open'](params)
  })
}