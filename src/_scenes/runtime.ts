export default function ({env, data, inputs, _inputs, _inputsCallable}) {
  inputs['open'](params => {
    env.openScene(data.sceneId, params,data.openType)

    _inputsCallable['_open'](params)
  })
}